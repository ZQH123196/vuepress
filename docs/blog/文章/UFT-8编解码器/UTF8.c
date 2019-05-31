#include "UTF8.h"

// 输入：unicode 编码
// 返回：unicode 编码为 UTF8 后所需要的字节数
uint32_t getByteNumOfEncodeUtf8(uint32_t value)
{
    ASSERT(value > 0, "Can't encode negative value!");

    // 单个 ascii 字符需要 1 字节
    if (value <= ascii_1byte)
    {
        return 1;
    }

    // 0~2047 的编码需要 2 字节
    if (value <= utf8_2byte)
    {
        return 2;
    }

    // 此范围内的数值编码为 utf8 需要 3 字节
    if (value <= utf8_3byte)
    {
        return 3;
    }

    // 此范围内的数值编码为 utf8 需要 4 字节
    if (value <= utf8_4byte)
    {
        return 4;
    }

    return 0; // 不考虑更高范围的编码。
}

// 把 value 编码为 utf8 后按照大端字节序写入缓冲区 buf,返回 buf
uint8_t *encodeUtf8(uint8_t *buf, uint32_t value)
{
    ASSERT(value > 0, "Can`t encode negative value!");

    switch (getByteNumOfEncodeUtf8(value))
    {
    case 1:
        *buf = value;
        break;
    case 2:
        // 此范围内数值编码为 utf8 需要 2 字节
        // 先写入高字节：110xxxxx
        // 0xc0 == 1100 0000，做高字节开头的 mask
        // value 的值最高只能是 utf8_2byte，即 0xxxxxxx xxxxxxxx 共 11 位
        // 取 10~6 位放置在高位的 110xxxxx 中，故 value >> 6 取 10~6 位
        *buf = 0xc0 | (value >> 6);
        // 再写入低字节：10xxxxxx
        // 0x80 == 1000 0000，做低字节开头的 mask
        // (value & 0x3f) 取 5~0 位
        *(buf++) = 0x80 | (value & 0x3f);
        break;
    case 3:
        // 此范围内数值编码为 utf8 需要 3 字节
        // 先写入高字节
        *buf = 0xe0 | ((value & 0xf000) >> 12);
        // 再写入中间字节
        *(buf++) = 0x80 | ((value & 0xfc0) >> 6);
        // 最后写入低字节
        *(buf++) = 0x80 | (value & 0x3f);
        break;

    case 4:
        // 此范围内数值编码为 utf8 需要 4 字节
        *buf = 0xf0 | ((value & 0x1c0000) >> 18);
        *(buf++) = 0x80 | ((value & 0x3f000) >> 12);
        *(buf++) = 0x80 | ((value & 0xfc0) >> 6);
        *(buf++) = 0x80 | (value & 0x3f);
        break;
    default:
        break;
    }
    return buf;
}

// 返回解码该 utf8 编码所需的字节数，即计算最高位 1 的数量，11110xxx 说明至少要 4 个字节
uint32_t getByteNumOfDecodeUtf8(uint8_t byte)
{
    // byte 应该是 utf8 的最高 1 字节
    // 如果不是最高位的字节，而是后面的字节，后面的字节以 10xxxxxx 来表达，返回 0
    if ((byte & 0xc0) == 0x80)
    { // 0xc0 == 1100 0000，0x80 == 1000 0000
        return 0;
    }

    if ((byte & 0xf8) == 0xf0)
    { // 0xf0 == 1111 0000
        return 4;
    }

    if ((byte & 0xf0) == 0xe0)
    { // 0xe0 == 1110 0000
        return 3;
    }

    if ((byte & 0xe0) == 0xc0)
    { // 0xc0 == 1100 0000
        return 2;
    }

    return 1; // ascii 码：0xxx xxxx
}

// 解码以 bytePtr 为起始地址的 UTF-8 序列，成功返回解码结果，失败返回 -1
uint32_t decodeUtf8(const uint8_t *bytePtr, uint32_t length)
{
    // 若是 1 字节的 ascii: 0xxx xxxx
    if (*bytePtr <= ascii_1byte)
    {
        return *bytePtr;
    }

    uint32_t value;
    uint32_t remainingBytes;

    // 先读取高字节
    // 根据高字节的高 n 位判断相应字节数的 utf8 编码
    if ((*bytePtr & 0xe0) == 0xc0)
    {   // 2 字节的 utf8
        // 0xe0 == ‭1110 0000‬，0xc0 == ‭11000000‬
        // 去掉头部的标识位 110 再取数据, 0x1f == ‭0001 1111‬
        value = *bytePtr & 0x1f;
        remainingBytes = 1;
    }
    else if ((*bytePtr & 0xf0) == 0xe0)
    {
        // 3 字节的 utf8
        value = *bytePtr & 0x0f;
        remainingBytes = 2;
    }
    else if ((*bytePtr & 0xf8) == 0xf0)
    {
        // 4 字节的 utf8
        value = *bytePtr & 0x07;
        remainingBytes = 3;
    }
    else
    { // 非法编码
        return -1;
    }

    // 如果 utf8 被斩断了就不再读过去了
    if (remainingBytes > length - 1)
    {
        return -1;
    }

    // 最后根据标识符读取低字节中的数据
    while (remainingBytes > 0)
    {
        bytePtr++;
        remainingBytes--;
        // 高 2 位必须是 10
        if ((*bytePtr & 0xc0) != 0x80)
        {
            return -1;
        }

        // 从次高字节往低字节,不断累加各字节的低 6 位，0x3f == 0011 1111
        value = value << 6 | (*bytePtr & 0x3f);
    }
    return value;
}
