#include "widget.h"
#include "./ui_widget.h"

#include <QFontDialog>
#include <QMessageBox>

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


void Widget::on_pushButton_clicked()
{
    bool gotFontSuccesfully = false;
    QFont font = QFontDialog::getFont(&gotFontSuccesfully, QFont("Times", 10), this);

    if(gotFontSuccesfully)
        ui->label->setFont(font);
    else
        QMessageBox::information(this, "Message", "Couldnt get font!");
}

