import todoStore from "../../store/todo.store";

let element;
/**
 * 
 * @param {String} elementId 
 */
export const renderPending = (elementId) => {

    if(!element)
        element = document.querySelector(elementId);
    if(!element)
        throw new Error(`No se encuentra el elemento ${elementId}`);

    element.innerHTML = todoStore.getTodos( todoStore.Filters.Pending).length;

}