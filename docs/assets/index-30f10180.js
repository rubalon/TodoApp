(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const v=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
`;let y;const L=new Uint8Array(16);function C(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(L)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function S(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:E};function P(e,t,c){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const i=e.random||(e.rng||C)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){c=c||0;for(let o=0;o<16;++o)t[c+o]=i[o];return t}return S(i)}class m{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[new m("Sacar al perro"),new m("Limpiar el baño"),new m("Hacer la cama"),new m("Poner la lavadora"),new m("Tender la ropa")],filter:a.All},A=()=>{T(),console.log("InitStore :)")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},I=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},U=e=>{if(!e)throw new Error("Description is required");l.todos.push(new m(e)),f()},D=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},F=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},k=()=>{l.todos=l.todos.filter(e=>!e.done),f()},x=(e=a.All)=>{l.filter=e,f()},O=()=>l.filter,d={addTodo:U,deleteCompleted:k,deleteTodo:F,getCurrentFilter:O,initStore:A,loadStore:T,setFilter:x,getTodos:I,toggleTodo:D,Filters:a};let h;const q=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(c=>{h.append(M(c))})},M=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:c,id:i}=e,o=`
                <div class="view">
                    <input class="toggle" type="checkbox" ${t?"checked":""}>
                    <label>${c}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.setAttribute("data-id",i),e.done&&n.classList.add("completed"),n.innerHTML=o,n};let w;const H=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`No se encuentra el elemento ${e}`);w.innerHTML=d.getTodos(d.Filters.Pending).length},u={PendingCount:"#pending-count",TodoFilters:".filtro",ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",DeleteInput:"destroy"},N=e=>{const t=()=>{const s=d.getTodos(d.getCurrentFilter());q(u.TodoList,s),c()},c=()=>{H(u.PendingCount)};(()=>{const s=document.createElement("div");s.innerHTML=v,document.querySelector(e).append(s),t()})();const i=document.querySelector(u.NewTodoInput),o=document.querySelector(u.TodoList),n=document.querySelector(u.ClearCompleted),p=document.querySelectorAll(u.TodoFilters);i.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value&&(d.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const g=s.target.closest("[data-id]");s.target.classList.contains(u.DeleteInput)?d.deleteTodo(g.getAttribute("data-id")):d.toggleTodo(g.getAttribute("data-id")),t()}),n.addEventListener("click",()=>{d.deleteCompleted(),t()}),p.forEach(s=>{s.addEventListener("click",()=>{switch(p.forEach(g=>g.classList.remove("selected")),s.classList.add("selected"),s.text){case"Todos":d.setFilter(a.All);break;case"Completados":d.setFilter(a.Completed);break;case"Pendientes":d.setFilter(a.Pending);break}t()})})};d.initStore();N("#app");
