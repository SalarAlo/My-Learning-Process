#include "mainwindow.h"
#include "./ui_mainwindow.h"

#include <QMessageBox>
#include <QTimer>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::on_actionQuit_triggered()
{
    statusBar()->showMessage("App is going to be quitted in 2 seconds...");

    QTimer::singleShot(2000, this, [=]()
    {
        QApplication::quit();
    });
}


void MainWindow::on_actionAbout_triggered()
{
    QMessageBox::information(this, "Information", "This is a Text editor and with it you can write text with a lot of cool functionality!");
}


void MainWindow::on_actionAbout_QT_triggered()
{
    QApplication::aboutQt();
}


void MainWindow::on_actionCopy_triggered()
{
    ui->textEdit->copy();
}


void MainWindow::on_actionCut_triggered()
{
    ui->textEdit->cut();
}


void MainWindow::on_actionPaste_triggered()
{
    ui->textEdit->paste();
}


void MainWindow::on_actionUndo_triggered()
{
    ui->textEdit->undo();
}


void MainWindow::on_actionRedo_triggered()
{
    ui->textEdit->redo();
}

