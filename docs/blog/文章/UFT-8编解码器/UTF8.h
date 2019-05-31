#include <stdint.h>

// 注意 ascii_1byte 0x7f 表达
#define ascii_1byte 0x7f
#define utf8_2byte 0x7ff
#define utf8_3byte 0xffff
#define utf8_4byte 0x10ffff

uint32_t getByteNumOfEncodeUtf8(uint32_t value);
uint32_t getByteNumOfDecodeUtf8(uint8_t byte);
uint8_t *encodeUtf8(uint8_t *buf, uint32_t value);
uint32_t decodeUtf8(const uint8_t *bytePtr, uint32_t length);