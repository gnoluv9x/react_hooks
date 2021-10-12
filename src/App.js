import { useEffect, useState } from "react";
import ColorBox from "./components/ColorBox";
import PostsList from "./components/PostsList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.scss";
import Pagination from "./components/Pagination";
import queryString from 'query-string';
import PostFilters from "./components/PostFilters";

function App() {
    const [todos, setTodos] = useState([
        { id: 1, title: "I love Easy Frontend! 😍 " },
        { id: 2, title: "We love Easy Frontend! 🥰 " },
        { id: 3, title: "They love Easy Frontend! 🚀 " },
    ]);

    const [posts, setposts] = useState([]);
    const [pagination, setpagination] = useState({
        _page : 1,
        _limit : 10,
        _totalRows : 1,
    });
    const [ filters, setFilters] = useState({
        _limit : 10,
        _page: 1,
        // ...
    });

    useEffect(() => {
        async function getPostsFromApi() {
            try {
                const convertUrlToString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${convertUrlToString}`;
                const response = await fetch(requestUrl);
                const responseJson = await response.json();
                const { data , pagination } = responseJson;
                setposts(data);
                setpagination(pagination);
            } catch (error) {
                console.log("Failed to fetch");
            }
        }

        getPostsFromApi();
    }, [ filters ]);

    function handleTodoList(todo, index) {
        // clone init array
        const newTodoList = [...todos];
        // hanle todo click
        newTodoList.splice(index, 1);
        // update todo list
        setTodos(newTodoList);
    }

    function handleFormSubmit(formValues) {
        // clone todo list array
        const newTodoList = [...todos];
        const newTodoFromFormValue = {
            id: todos.length + 1,
            ...formValues,
        };
        newTodoList.push(newTodoFromFormValue);
        setTodos(newTodoList);
    }

    function handlePageChange(newPage){

       setFilters({
           ...filters,
           _page : newPage,
       })
    }
    function handleSubmitForm(formValues){
        
        const inputValue =  {
            ...filters,
            _page : 1,
            title_like : formValues.searchValue
        };
        setFilters(inputValue);
    }

    return (
        <div className="App">
            {/* <ColorBox /> */}

            {/* <TodoForm onSubmit={handleFormSubmit} /> */}
            {/* <TodoList todos={todos} onTodoClick={handleTodoList} /> */}
            <h3>Render posts list</h3>
            <PostFilters onSubmit={handleSubmitForm}/>
            <PostsList posts={posts} />
            <Pagination 
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default App;
