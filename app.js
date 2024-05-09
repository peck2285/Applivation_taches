window.onload = () => {
 
  const form = document.getElementById("productForm");

  
  const saveLocalData = (data) =>{
      if("localStorage" in window){
            localStorage.setItem("todos", JSON.stringify(data))
       }
    }


    const getLocalData = () =>{
        if("localStorage" in window){
            return JSON.parse(localStorage.getItem("todos")) || []
        }else{
            return []
        }
    }


    const refetch =()=>{

 const ul = document.getElementById("todoList")
 
    ul.innerHTML = ""

  todos.forEach((todo)=>{

     const li = document.createElement("li");
     const nameSpan = document.createElement("span");
     nameSpan.innerHTML = todo.name;
      const categorySpan = document.createElement("span");
      categorySpan.innerHTML = todo.category;
      const updateButton = document.createElement("button");
        updateButton.className = "btn btn-warning";
        updateButton.innerText = "No Buy ";
         const deleteButton = document.createElement("button");
         deleteButton.innerText = "DELETE";
          deleteButton.className = "btn btn-danger"
          deleteButton.onclick = () => handleDelete(todo)
          if (todo.isUpdating) {
             //updating
               updateButton.className = "btn btn-warning"
              updateButton.innerText = "Buy "
          }else{

            updateButton.className = "btn btn-primary"
            updateButton.innerText = "No Buy "
           
          }
           updateButton.onclick = () => toggleUpdate(todo)
           li.appendChild(nameSpan);
            li.appendChild(categorySpan);
            li.appendChild(updateButton);
             li.appendChild(deleteButton);
             ul.appendChild(li);


  
       })
 
   }
  


  let todos =  getLocalData()


  refetch()
  

  const toggleUpdate = (todo) => {

    
      // autoriser la mise à jour
        const index = todos.findIndex(t => t._id == todo._id)
        todos[index].isUpdating = !todos[index].isUpdating
         saveLocalData(todos)
        // METTRE A JOUR L'INTERFACE
        refetch()
    }

  handleDelete = ({_id}) =>{

  
    todos = todos.filter(t => t._id !== _id)
    saveLocalData(todos)
    refetch();
  }
  

  
  

  form.onsubmit = (event) =>{
        event.preventDefault()

        const input = form.querySelector("input")
        const todoName = input.value.trim()


         const select = document.getElementById("categorie");
        const selectedCategory = select.options[select.selectedIndex].value;

        if(todoName && selectedCategory){
            
          const todo = {
                _id: Math.round(Math.random()*8585415),
                name: todoName,
                 category: selectedCategory,
                updatedAt: null,
                createdAt: new Date(),
                 isUpdating: false
             }
            
           
            todos.push(todo)
            saveLocalData(todos)
            refetch()
        }

         form.reset()
    
    }







   
};
