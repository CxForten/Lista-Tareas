const btn = document.querySelector('.btn-agregar');
const divLista = document.querySelector('.lista-tarea');
const texto = document.querySelector('.tarea');
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();
let tareas= [];

btn.addEventListener('click', () =>{
    setTarea();
})
divLista.addEventListener('click', e =>{
    btnAccion(e)
})

function setTarea(){
    const tarea ={
        id: Date.now(),
        texto: texto.value,
        estado: false
    }
    tareas.push(tarea);
    texto.value='';
    mostrarTarea();
}

function mostrarTarea(){
    divLista.innerHTML='';
    tareas.forEach(tarea => {
        let clone = template.cloneNode(true);
        clone.querySelector('.nombre-tarea').textContent=tarea.texto;
        clone.querySelector('.check').setAttribute('id',tarea.id);
        clone.querySelector('.delete').setAttribute('id',tarea.id);
        if (tarea.estado) {
            clone.querySelector('.nombre-tarea').classList.add('completada');
        }
        fragment.appendChild(clone);
    });
    divLista.appendChild(fragment);
}

function btnAccion(e){
    e.preventDefault();
    const ID=Number(e.target.id);
    if(e.target.classList.contains('check')){
        tareas.forEach(tarea => {
            if (tarea.id === ID) {
                tarea.estado = !tarea.estado; // Cambia el estado a su opuesto
            }
        });
    }
    if (e.target.classList.contains('delete')){
        const deleteIndex = tareas.map(nombre=> nombre.id).indexOf(ID);
        tareas.splice(deleteIndex, 1);
    }
    mostrarTarea();
}