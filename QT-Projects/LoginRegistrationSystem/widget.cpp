#include "widget.h"
#include "./ui_widget.h"

#include "logindialog.h"
#include "signindialog.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);
}

Widget::~Widget()
{
    delete ui;
}


void Widget::on_loginBtn_clicked()
{
    // Create instance of login class and also give usermap
    LoginDialog* logger = new LoginDialog(this, userMap);

    // madon
    logger->exec();
}


void Widget::on_signInBtn_clicked()
{

    // create instance of SignInDialog class and give it our userMap
    SignInDialog* signer = new SignInDialog(this);

    connect(signer, &QDialog::accepted, [=]()
    {
        UpdateUserMap(signer);
    });

    // madon
    signer->exec();
}

void Widget::UpdateUserMap(SignInDialog* signer)
{
    userMap[signer->username] = signer->password;
}

