#include "widget.h"
#include "./ui_widget.h"

#include <QTableWidget>
#include <QTableWidgetItem>
#include <QMessageBox>

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    // setup the ui
    ui->setupUi(this);

    // set the table equal to ui->expensesTable
    table = ui->expensesTable;
}

Widget::~Widget()
{
    // delete the ui pointer for no memory leak
    delete ui;

    // remove all of the pointers and free up the memory with shrink_to_fit
    garbageCollection.clear();
    garbageCollection.shrink_to_fit();
}

void Widget::Reset()
{
    // Reset all of the ui elements value's

    ui->calender->setSelectedDate(QDate::currentDate());
    ui->amount->setValue(0.00);
    ui->categoryLineEdit->setText("");
    ui->notesLineEdit->setText("");
    ui->categoryComboBox->setCurrentIndex(0);
}

bool Widget::canAdd()
{
    // if the expense really is an expense becouse if smt costs 0 it isnt an expense!
    return (ui->amount->value() != 0);
}

QString Widget::currentDate()
{
    // get the current Date which the user selected and convert to string
    return ui->calender->selectedDate().toString("yyyy.MM.dd");
}

QString Widget::currentExpense()
{
    // get the current value in the amount spin box and convert it to string
    return QString::number(ui->amount->value());
}

QString Widget::currentCategory()
{
    // get the current category
    return ui->categoryComboBox->currentText();
}

QString Widget::currentNotes()
{
    // get the current notes if theyre empty we return '/'
    return (!ui->notesLineEdit->text().isEmpty()) ? ui->notesLineEdit->text() : "/";
}

void Widget::on_addButton_clicked()
{
    // the last row index + 1 so the row index we want to append
    const int rowAppendIndex = table->rowCount();

    // update the total Spent variable
    totalSpent += ui->amount->value();

    // get all of the data and put it in those QTableWidget pointers
    QTableWidgetItem* date = new QTableWidgetItem(currentDate());
    QTableWidgetItem* category = new QTableWidgetItem(currentCategory());
    QTableWidgetItem* expense = new QTableWidgetItem(currentExpense() +  "€");
    QTableWidgetItem* notes = new QTableWidgetItem(currentNotes());

    // put these pointers in the garbage collection so that we can eventually delete it
    garbageCollection.push_back(date);
    garbageCollection.push_back(category);
    garbageCollection.push_back(expense);
    garbageCollection.push_back(notes);

    // add the actual data to a row
    table->insertRow(rowAppendIndex);
    table->setItem(rowAppendIndex, 0, date);
    table->setItem(rowAppendIndex, 1, category);
    table->setItem(rowAppendIndex, 2, expense);
    table->setItem(rowAppendIndex, 3, notes);

    // update the totalSpent label
    ui->totalSpentLabel->setText(QString::number(totalSpent)+ "€");

    // reset the ui elements
    Reset();
}

void Widget::on_addCategory_clicked()
{
    // get the QString of the line edit
    const QString categoryToAdd = ui->categoryLineEdit->text();

    // add the QString to our combo box
    ui->categoryComboBox->addItem(categoryToAdd);
    ui->categoryLineEdit->setText("");
}

void Widget::on_removeSelectedButton_clicked()
{
    // get the currently selected row index
    const int currRowSelected = table->currentRow();
    // remove the row at the currently selected row index
    table->removeRow(currRowSelected);
}

void Widget::on_amount_valueChanged(double arg1)
{
    // if we can add then we set the addButton enabled else we denable it
    if(!canAdd())
    {
        ui->addButton->setEnabled(false);
    }
    else
    {
        ui->addButton->setEnabled(true);
    }
}

void Widget::on_categoryLineEdit_textChanged(const QString &arg1)
{
    // if the categoryToAdd string isnt equal to "" then we can click the button else we cant
    if(arg1.isEmpty())
    {
        ui->addCategory->setEnabled(false);
    }
    else
    {
        ui->addCategory->setEnabled(true);
    }
}


