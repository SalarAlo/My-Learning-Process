#include "infodialog.h"
#include "ui_infodialog.h"

Infodialog::Infodialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::infodialog)
{
    ui->setupUi(this);
}

Infodialog::~Infodialog()
{
    delete ui;
}

void Infodialog::on_okBtn_clicked()
{
    QString userPosition = ui->positionLineEdit->text();

    if(!userPosition.isEmpty())
    {
        pos = userPosition;

        if(ui->windows_R_Btn->isChecked())
        {
            favouriteOperatingSystem = "Windows";
        }
        else if(ui->Linux_R_Btn->isChecked())
        {
            favouriteOperatingSystem = "Linux";
        }
        else if(ui->mac_R_btn->isChecked())
        {
            favouriteOperatingSystem = "Mac";
        }

        accept();
    }
    else
    {
        reject();
    }
}


void Infodialog::on_cancelBtn_clicked()
{
    reject();
}

QString Infodialog::GetPos()
{
    return pos;
}

QString Infodialog::GetFavouriteOperatingSystem()
{
    return favouriteOperatingSystem;
}

