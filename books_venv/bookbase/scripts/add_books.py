from mybooks.models import Book


def get_data(line):
    split = line.split("/")
    return split[0], split[1] if "/" in line else line,


def run():
    text_data = open("C:\\temp\\books.txt", "rb").read()
    data = [get_data(line) for line in text_data.split("\n") if len(line) > 1]
    for name, author in data:
        Book(author=author.strip(), book_name=name.strip()).save()
