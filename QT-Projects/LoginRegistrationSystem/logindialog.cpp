#include "logindialog.h"
#include "ui_logindialog.h"

#include <QtCore/Qt>
#include <QMessageBox>

LoginDialog::LoginDialog(QWidget *parent, QMap<QString, QString> map) :
    QDialog(parent),
    ui(new Ui::LoginDialog)
{
    ui->setupUi(this);
    usernames = map;
}

LoginDialog::~LoginDialog()
{
    delete ui;
}

void LoginDialog::on_loginButton_clicked()
{
    // Get the lineedits value
    QString username = ui->usernameLE->text();
    QString password = ui->passwordLE->text();

    // if there is the provided username in our system
    if(usernames.contains(username))
    {
        // if that username has the provided password
        if(usernames[username] == password)
        {
            // Succes
            QMessageBox::information(this, "Succes", "Succesfully logged in!");
            accept();
        }else
        {
            // no sucess
            QMessageBox::warning(this, "Warning", "Username doesnt match password \n try again!");
            reject();
        }
    }else // didnt find username!
    {
        QMessageBox::warning(this, "Warning", "Username couldnt be found! \n try again!");
        reject();
    }
}

