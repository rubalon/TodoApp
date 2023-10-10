 import html from './app.html?raw';
 import todoStore, { Filters } from '../store/todo.store';
import { renderTodos , renderPending } from './use-cases';

const ElementIDs = {
    PendingCount: '#pending-count',
    TodoFilters: '.filtro',
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    DeleteInput: 'destroy',// no lleva punto porque hago un contains del classList en lugar de un query selector

}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        UpdatePendingCount();
    }

    const UpdatePendingCount = () => {
        renderPending (ElementIDs.PendingCount);
    }

    // Cuando la funcion App () se llama 
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();

    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector (ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector( ElementIDs.TodoList);
    const ClearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const FiltersLi = document.querySelectorAll( ElementIDs.TodoFilters);
    //console.log(FiltersLi);

    //listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
    const enterKey = 13;

        if (event.keyCode !== enterKey ) return;
        if (!event.target.value) return;
        
        todoStore.addTodo( event.target.value);
        displayTodos();
        event.target.value = '';
    });
    
    todoListUL.addEventListener('click', (event) =>{
        const element = event.target.closest('[data-id]');
        if (event.target.classList.contains(ElementIDs.DeleteInput)) {
            todoStore.deleteTodo(element.getAttribute('data-id'));
        }else{
            todoStore.toggleTodo( element.getAttribute('data-id'));
        }
        displayTodos();
    })

    ClearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted(); 
        displayTodos();


    } )

    FiltersLi.forEach(element => {

        element.addEventListener('click', () => {
            FiltersLi.forEach(el => el.classList.remove('selected'));
            element.classList.add('selected');
            switch(element.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All )
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break; 
            }
            displayTodos();
        })
    });


    }


