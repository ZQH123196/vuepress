#include <iostream>
#include <Windows.h>
using namespace std;
struct Node // 结点
{
	int Data;
	Node *Next;
	Node *Prior;
};
class List // 自带头结点的顺序单链表
{
private:
	Node *head; // 头结点的数据域可以记录线性表的长度
	Node *rear; // 尾指针
public:
	List(); // 设置一个头结点
	~List(); // 析构函数,注意要释放掉所有的动态内存
	void createlist(); // 创建链表
	void insertlist(); // 结点的插入(0 = 头插法; 1 = 尾插法)
	void showlist(); // 显示链表
	void deletelist(); // 删除结点
};
List::List()
{
	head = new Node;
	head->Data = 0;
	head->Next = head;
	head->Prior = head;

}
List::~List()
{
	if (head != NULL) // 避免析构函数二次调用时出错
	{
		Node *p;
		while (head->Next->Next != head)
		{
			p = head->Next;
			head->Next = head->Next->Next;
			delete p;
		}
		delete head->Next;
		delete head;
		head = NULL;
		rear = NULL;
	}
}
void List::createlist()
{
	int T, i;
	cout << "输入你要创建的链表长度" << endl;
	cin >> T;
	cout << "请输入值(空格隔开)" << endl;
	Node *n = head, *m;
	for (i = 0; i < T; i++)
	{
		m = new Node;
		n->Next = m;
		m->Prior = n;
		n = m;
		cin >> m->Data;
		head->Data++;
	}
	rear = m;
	rear->Next = head;

}
void List::insertlist()
{
	Node *n;
	int m, T;
	cout << "0 = 头插法" << endl;
	cout << "1 = 尾插法" << endl; // 尾插法的尾指针需要更改
	cin >> T >> m;
	if (head->Next == NULL) T = 0;
	switch (T)
	{
	case 0: // 如果当前链表无元素,那么对于带头结点的链表而言,头插跟尾插无甚区别
		n = new Node;
		rear = n;
		head->Next = rear;
		rear->Prior = head;
		rear->Data = m;
		rear->Next = head;
		break;
	case 1:
		n = head->Next;
		head->Next = new Node;
		head->Next->Data = m;
		head->Next->Next = n;
		head->Next->Prior = head;
		break;
	case 2:
		n = new Node;
		rear->Next = n;
		n->Prior = rear;
		n->Next = head;
		n->Data = m;
		rear = n;
		break;
	}
	head->Data++;
}
void List::showlist()
{
	Node *n;
	n = head;
	cout << "显示当前链表的元素：";
	if (n->Next == head) cout << "神马都木有！";
	while (n->Next != head)
	{
		n = n->Next;
		cout << n->Data << " ";
	}
	cout << endl;
}
void List::deletelist() // 删除第T个结点,当T=0时删除结束
{
	int T = 1, i;
	Node *m;
	while (true)
	{
		if (head->Data == 0)
		{
			cout << "线性表为空！" << endl;
			break;
		}
		cout << "请输入要删除的结点位置(输入0结束)：";
		cin >> T;
		if (T == 0) break;
		if (head->Data < T)
		{
			cout << "超出线性表！" << endl;
			continue;
		}
		m = head->Next;
		for (i = 2; i <= T; i++)
		{
			m = m->Next;
		}
		if (rear == m) // 判断当前delete掉的是否是最后一个,如果是尾结点换为上一个
		{
			rear = m->Prior;
		}
		m->Prior->Next = m->Next;
		delete m;
		head->Data--;
	}
}

int main()
{
	List s;
	s.createlist();
	s.showlist();
	s.insertlist();
	s.insertlist();
	s.showlist();
	s.deletelist();
	s.showlist();
	return 0;
}