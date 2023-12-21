#include<stdio.h>

typedef struct point
{
    int x;//横坐标
    int y;//纵坐标
}POINT;
typedef struct rect
{
    POINT LeftTop;//左上角顶点的坐标
    POINT RightBottom;//右下角顶点的坐标
}RECT;

void getPoint(POINT *p)
{
    scanf("%d%d",&(p->x),&(p->y));
}
void getRect(RECT *rc){
    getPoint(&(rc->LeftTop));
    getPoint(&(rc->RightBottom));
}
int judgeRelation(POINT p,RECT rc){
    int res;
    if(p.x==rc.LeftTop.x||p.x==rc.RightBottom.x){
        if(p.y<=rc.LeftTop.y&&p.y>=rc.RightBottom.y){
            res =1;
        }
        else res =3;
    }
    else if(p.y==rc.LeftTop.y||p.y==rc.RightBottom.y){
        if(p.x>=rc.LeftTop.x&&p.x<=rc.RightBottom.x){
            res =1;
        }
        else res =3;
    }
    else if(p.x==rc.RightBottom.x){
        if(p.y>=rc.LeftTop.y&&p.y<=rc.RightBottom.y){
            res =1;
        }
        else res =3;
    }
    else if(p.x>=rc.LeftTop.x&&p.x<=rc.RightBottom.x&&p.y<=rc.LeftTop.y&&p.y>=rc.RightBottom.y){
        res=2;
    }
    else{
        res = 3;
    }
    return res;
}
int main()
{
    POINT p;
    RECT rc;
    getPoint(&p);
    getRect(&rc);
    switch (judgeRelation(p,rc))
    {
    case 1:
        puts("The point is on one edge.");
        break;
    case 2:
        puts("The point is inside the rectangle.");
        break;
    case 3:
        puts("The point is outside the rectangle.");
        break;
    }
    return 0;
}