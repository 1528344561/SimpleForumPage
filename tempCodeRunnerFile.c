#include<stdio.h>

int main()
{
    char t[2000];
    char s[2000];
    int len = 0;
    while(gets(t))
    {
        len = 0;
        for(int i=0;t[i];i++)
        {
            if(t[i]>='a'&&t[i]<='z')t[i]-=32;
            if(t[i]>='A'&&t[i]<='Z')s[len++]=  t[i];
            if(t[i]>='0'&&t[i]<='9')s[len++] =t[i];
        }
        s[len] =0;
        int flag=0;
        for(int i=0;i<=len/2;i++)
        {
            if(s[i]!=s[len-i-1])
            {
                flag =1;
            }

        }
        if(flag)
        {
            printf("No.\n");
        }
        else printf("Yes.\n");
    }
}