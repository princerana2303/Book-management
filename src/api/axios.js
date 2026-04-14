// Import axios library for making HTTP requests (GET, POST, PUT, DELETE)
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

const axiosInstance = axios.create({
  baseURL: baseURL || undefined,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "TOKEN_INVALID_OR_EXPIRED"
    ) {
      console.warn("JWT expired or invalid. Auto-logout triggered.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

const getMockUsers = () => {
  const raw = localStorage.getItem("mock_users");
  if (!raw) {
    const defaultUsers = [
      {
        id: "user-1",
        username: "demo",
        email: "demo@example.com",
        password: "password123",
        role: "user",
      },
    ];
    localStorage.setItem("mock_users", JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(raw);
};

const saveMockUsers = (users) => {
  localStorage.setItem("mock_users", JSON.stringify(users));
};

const getMockBooks = () => {
  const raw = localStorage.getItem("mock_books");
  if (!raw) {
    const defaultBooks = [
      { _id: "1", title: "Atomic Habits", author: "James Clear", year: 2018 },
      { _id: "2", title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018 },
      { _id: "3", title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999 },
      { _id: "4", title: "Clean Code", author: "Robert C. Martin", year: 2008 },
      { _id: "5", title: "Deep Work", author: "Cal Newport", year: 2016 },
      { _id: "6", title: "The Seven Habits of Highly Effective People", author: "Stephen R. Covey", year: 1989 },
      { _id: "7", title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
      { _id: "8", title: "1984", author: "George Orwell", year: 1949 },
      { _id: "9", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
      { _id: "10", title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
      { _id: "11", title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
      { _id: "12", title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", year: 1997 },
      { _id: "13", title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
      { _id: "14", title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
      { _id: "15", title: "Dune", author: "Frank Herbert", year: 1965 },
      { _id: "16", title: "Neuromancer", author: "William Gibson", year: 1984 },
      { _id: "17", title: "Foundation", author: "Isaac Asimov", year: 1951 },
      { _id: "18", title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", year: 1979 },
      { _id: "19", title: "Ender's Game", author: "Orson Scott Card", year: 1985 },
      { _id: "20", title: "The Name of the Wind", author: "Patrick Rothfuss", year: 2007 },
      { _id: "21", title: "American Gods", author: "Neil Gaiman", year: 2001 },
      { _id: "22", title: "The Lies of Locke Lamora", author: "Scott Lynch", year: 2006 },
      { _id: "23", title: "Mistborn: The Final Empire", author: "Brandon Sanderson", year: 2006 },
      { _id: "24", title: "The Way of Kings", author: "Brandon Sanderson", year: 2010 },
      { _id: "25", title: "The Fifth Season", author: "N.K. Jemisin", year: 2015 },
      { _id: "26", title: "The Martian", author: "Andy Weir", year: 2011 },
      { _id: "27", title: "Ready Player One", author: "Ernest Cline", year: 2011 },
      { _id: "28", title: "Snow Crash", author: "Neal Stephenson", year: 1992 },
      { _id: "29", title: "Cryptonomicon", author: "Neal Stephenson", year: 1999 },
      { _id: "30", title: "The Three-Body Problem", author: "Liu Cixin", year: 2006 },
      { _id: "31", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", year: 2011 },
      { _id: "32", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", year: 2011 },
      { _id: "33", title: "The Power of Habit", author: "Charles Duhigg", year: 2012 },
      { _id: "34", title: "Educated", author: "Tara Westover", year: 2018 },
      { _id: "35", title: "Becoming", author: "Michelle Obama", year: 2018 },
      { _id: "36", title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", year: 2016 },
      { _id: "37", title: "How to Win Friends and Influence People", author: "Dale Carnegie", year: 1936 },
      { _id: "38", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997 },
      { _id: "39", title: "The Lean Startup", author: "Eric Ries", year: 2011 },
      { _id: "40", title: "Zero to One", author: "Peter Thiel", year: 2014 },
      { _id: "41", title: "The Innovator's Dilemma", author: "Clayton Christensen", year: 1997 },
      { _id: "42", title: "Rework", author: "Jason Fried", year: 2010 },
      { _id: "43", title: "The Hard Thing About Hard Things", author: "Ben Horowitz", year: 2014 },
      { _id: "44", title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", year: 2015 },
      { _id: "45", title: "Design Patterns", author: "Gang of Four", year: 1994 },
      { _id: "46", title: "You Don't Know JS", author: "Kyle Simpson", year: 2014 },
      { _id: "47", title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008 },
      { _id: "48", title: "React: Up and Running", author: "Stoyan Stefanov", year: 2016 },
      { _id: "49", title: "Node.js Design Patterns", author: "Mario Casciaro", year: 2016 },
      { _id: "50", title: "Fullstack React", author: "Accomazzo Anthony", year: 2017 },
      { _id: "51", title: "Learning React", author: "Alex Banks", year: 2017 },
      { _id: "52", title: "The Road to React", author: "Robin Wieruch", year: 2018 },
      { _id: "53", title: "Pro React", author: "Cassio de Sousa Antonio", year: 2015 },
      { _id: "54", title: "React Native in Action", author: "Nader Dabit", year: 2019 },
      { _id: "55", title: "MongoDB: The Definitive Guide", author: "Kristina Chodorow", year: 2010 },
      { _id: "56", title: "Express.js Guide", author: "Azat Mardan", year: 2014 },
      { _id: "57", title: "RESTful Web APIs", author: "Leonard Richardson", year: 2013 },
      { _id: "58", title: "Web Development with Node and Express", author: "Ethan Brown", year: 2014 },
      { _id: "59", title: "Professional Node.js", author: "Pedro Teixeira", year: 2012 },
      { _id: "60", title: "Learning Node.js", author: "Marc Wandschneider", year: 2013 }
    ];
    localStorage.setItem("mock_books", JSON.stringify(defaultBooks));
    console.log(`📚 Loaded ${defaultBooks.length} default books into localStorage`);
    return defaultBooks;
  }
  const books = JSON.parse(raw);
  console.log(`📚 Retrieved ${books.length} books from localStorage`);
  return books;
};

const saveMockBooks = (books) => {
  localStorage.setItem("mock_books", JSON.stringify(books));
};

const parseUrl = (url) => {
  const parser = new URL(url, "http://localhost");
  return {
    pathname: parser.pathname,
    searchParams: parser.searchParams,
  };
};

const createMockResponse = (data) => ({ data });

const mockRequest = async (method, url, data) => {
  const { pathname, searchParams } = parseUrl(url);

  if (pathname === "/auth/register" && method === "post") {
    const users = getMockUsers();
    const existing = users.find((user) => user.email === data.email);
    if (existing) {
      const error = new Error("Email already registered");
      error.response = { data: { message: "Email already registered" } };
      throw error;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username: data.username,
      email: data.email,
      password: data.password,
      role: "user",
    };
    users.push(newUser);
    saveMockUsers(users);
    return createMockResponse({ message: "User registered" });
  }

  if (pathname === "/auth/login" && method === "post") {
    const users = getMockUsers();
    const user = users.find(
      (item) => item.email === data.email && item.password === data.password
    );

    if (!user) {
      const error = new Error("Invalid email or password");
      error.response = { data: { message: "Invalid email or password" } };
      throw error;
    }

    return createMockResponse({
      token: "mock-jwt-token",
      user: { role: user.role, email: user.email, username: user.username },
    });
  }

  if (pathname === "/books" && method === "get") {
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const search = (searchParams.get("search") || "").toLowerCase();

    const allBooks = getMockBooks();
    const filtered = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const dataPage = filtered.slice((currentPage - 1) * limit, currentPage * limit);

    return createMockResponse({
      data: dataPage,
      page: currentPage,
      totalPages,
    });
  }

  if (pathname === "/books" && method === "post") {
    const books = getMockBooks();
    const newBook = {
      _id: `${Date.now()}`,
      title: data.title,
      author: data.author,
      year: data.year,
    };
    books.unshift(newBook);
    saveMockBooks(books);
    return createMockResponse(newBook);
  }

  if (pathname.startsWith("/books/") && method === "delete") {
    const books = getMockBooks();
    const id = pathname.split("/")[2];
    const updated = books.filter((book) => book._id !== id);
    saveMockBooks(updated);
    return createMockResponse({ message: "Deleted" });
  }

  if (pathname.startsWith("/books/") && method === "put") {
    const books = getMockBooks();
    const id = pathname.split("/")[2];
    const updatedBooks = books.map((book) =>
      book._id === id ? { ...book, ...data } : book
    );
    saveMockBooks(updatedBooks);
    const updatedBook = updatedBooks.find((book) => book._id === id);
    return createMockResponse(updatedBook);
  }

  const error = new Error("Mock API route not found");
  error.response = { status: 404, data: { message: "Not found" } };
  throw error;
};

const shouldUseMock = (error) => {
  return (
    !baseURL ||
    error?.code === "ERR_NETWORK" ||
    error?.message?.includes("Network Error") ||
    error?.message?.includes("connect ECONNREFUSED")
  );
};

const request = async (method, url, data, config = {}) => {
  if (!baseURL) {
    return mockRequest(method, url, data);
  }

  try {
    if (method === "get" || method === "delete") {
      return await axiosInstance[method](url, config);
    }
    return await axiosInstance[method](url, data, config);
  } catch (error) {
    if (shouldUseMock(error)) {
      return mockRequest(method, url, data);
    }
    throw error;
  }
};

const api = {
  get: (url, config) => request("get", url, undefined, config),
  post: (url, data, config) => request("post", url, data, config),
  put: (url, data, config) => request("put", url, data, config),
  delete: (url, config) => request("delete", url, undefined, config),
};

export default api;