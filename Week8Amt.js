// Author Class: Represents an author with a name and birth year
class Author {
    constructor(name, birthYear) {
        // Initialize the author with a name and birth year
        this.name = name;
        this.birthYear = birthYear;
    }

    describe() {
        // Return a description of the author
        return `${this.name}, born in ${this.birthYear}`;
    }
}

// Book Class: Represents a book with a title and an associated author
class Book {
    constructor(title, author) {
        // Initialize the book with a title and an Author object
        this.title = title;
        this.author = author;
    }

    describe() {
        // Return a description of the book including the title and author's description
        return `"${this.title}" by ${this.author.describe()}`;
    }
}

// Library Class: Represents a library that holds multiple books
class Library {
    constructor(name) {
        // Initialize the library with a name and an empty array for books
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        // Add a Book instance to the library's book list
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            // Throw an error if the argument is not an instance of Book
            throw new Error(`You can only add an instance of Book. Argument is not a book: ${book}`);
        }
    }

    describe() {
        // Return a description of the library, including the number of books
        return `${this.name} has ${this.books.length} books.`;
    }
}

// Menu Class: Manages user interactions and operations for libraries and books
class Menu {
    constructor() {
        // Initialize an empty array for libraries and no selected library
        this.libraries = [];
        this.selectedLibrary = null; // Manage one library at a time
    }

    start() {
        // Entry point for the application
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            // Process user selection based on the menu option
            switch (selection) {
                case '1':
                    this.createLibrary(); // Create a new library
                    break;
                case '2':
                    this.viewLibrary(); // View details of an existing library
                    break;
                case '3':
                    this.deleteLibrary(); // Delete a library
                    break;
                case '4':
                    this.displayLibraries(); // Display all libraries
                    break;
                default:
                    selection = 0; // Exit if the selection is invalid
            }
            selection = this.showMainMenuOptions(); // Show the main menu again
        }
        alert('Goodbye!'); // Exit message
    }

    showMainMenuOptions() {
        // Display the main menu options and return user selection
        return prompt(`
0) exit
1) create a new library
2) view a library
3) delete a library
4) display all libraries
`);
    }

    showLibraryMenuOptions(libraryInfo) {
        // Display the menu options for managing a selected library
        return prompt(`
0) back
1) add a new book
2) delete a book
-----------------
${libraryInfo}
`);
    }

    displayLibraries() {
        // Create a string listing all libraries with their indices
        let libraryString = '';
        for (let i = 0; i < this.libraries.length; i++) {
            libraryString += i + ') ' + this.libraries[i].name + '\n';
        }
        alert(libraryString); // Display the list of libraries
    }

    createLibrary() {
        // Prompt for a new library name and add it to the libraries array
        let name = prompt('Enter name for new library: ');
        this.libraries.push(new Library(name));
    }

    viewLibrary() {
        // Prompt for the index of the library to view
        let index = prompt("Enter the index of the library that you want to view:");
        if (index > -1 && index < this.libraries.length) {
            this.selectedLibrary = this.libraries[index]; // Set the selected library
            let description = 'Library Name: ' + this.selectedLibrary.name + '\n';
            description += ' ' + this.selectedLibrary.describe() + '\n ';
            for (let i = 0; i < this.selectedLibrary.books.length; i++) {
                // Add each book's description to the library's details
                description += i + ') ' + this.selectedLibrary.books[i].describe() + '\n';
            }
            let selection1 = this.showLibraryMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createBook(); // Add a new book to the selected library
                    break;
                case '2':
                    this.deleteBook(); // Delete a book from the selected library
                    break;
            }
        }
    }

    deleteLibrary() {
        // Prompt for the index of the library to delete
        let index = prompt('Enter the index of the library that you wish to delete: ');
        if (index > -1 && index < this.libraries.length) {
            this.libraries.splice(index, 1); // Remove the library from the array
        }
    }

    createBook() {
        // Prompt for book details and add the book to the selected library
        let title = prompt('Enter title for new book: ');
        let authorName = prompt('Enter author name for new book: ');
        let authorBirthYear = prompt('Enter author birth year for new book: ');
        let author = new Author(authorName, authorBirthYear); // Create an Author object
        this.selectedLibrary.addBook(new Book(title, author)); // Add the new Book to the selected library
    }

    deleteBook() {
        // Prompt for the index of the book to delete
        let index = prompt('Enter the index of the book that you wish to delete: ');
        if (index > -1 && index < this.selectedLibrary.books.length) {
            this.selectedLibrary.books.splice(index, 1); // Remove the book from the library's array
        }
    }
}

// Initialize the Menu when the window loads
window.onload = () => {
    let menu = new Menu();
    menu.start(); // Start the application
}
