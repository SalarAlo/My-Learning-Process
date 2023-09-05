#include "widget.h"
#include "./ui_widget.h"
#include "infodialog.h"

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


void Widget::on_provideInfoBtn_clicked()
{
    Infodialog* dialog = new Infodialog(this);

    // First Approach

//    int ret = dialog->exec();

//    if(ret == QDialog::Accepted)
//    {
//        ui->infoLabel->setText("Your Position: " + dialog->GetPos() + "\n Your favourite os: " + dialog->GetFavouriteOperatingSystem());
//    }
//    else
//    {
//        QMessageBox::information(this, "Message", "You havent accepted anything so we cant display with your data!");
//    }


    // Second Approach

    connect(dialog, &QDialog::accepted, [=]()
    {
        ui->infoLabel->setText("Your Position: " + dialog->GetPos() + "\n Your favourite os: " + dialog->GetFavouriteOperatingSystem());
    });

    dialog->exec();
    // either modal or non-modal so that this instance of the class is accesible or not.
    // if accesable that means non modal of not modal
    // dialog->exec = modal!
    // dialog->show = non-modal!
}

