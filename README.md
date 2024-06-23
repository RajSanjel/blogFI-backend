# Expense Tracker Backend

A simple app in made using MERN stack, which allows user to add expense, get weekly report, datas displayed in chart for easier analysis.


## Running

Generate RSA Private Key & Public Key

```bash
  openssl genrsa -out ./private.key 4096
```
```bash
  openssl rsa -in private.key -pubout -outform PEM -out public.key
```
