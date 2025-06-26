let list = [];

const form = document.querySelector("form");
const shoppingInput = document.getElementById("shopping");
const shoppingList = document.getElementById("shopping-list");
const footer = document.querySelector("footer");
const footerText = footer.querySelector("p");
const footerButton = footer.querySelector("button");

form.onsubmit = (event) => {
  event.preventDefault();
  handleAddNewShoppingItem(shoppingInput.value);
}

footerButton.addEventListener('click', handleCloseFooter);

function handleAddNewShoppingItem(name) {
  try {
    const hasItem = list.some((item) => item.name === name);

    if (hasItem) {
      throw new Error('Esse item já existe na lista.');
    }
    
    const itemId = `shopping-item-${list.length + 1}`;
    
    list.push({
      id: itemId,
      name,
    });

    const itemHTML = `
      <div class="checkbox-wrapper">
        <div class="checkbox">
          <img src="assets/icons/check.svg" class="check">
        </div>
        <input type="checkbox" name="shopping-item" id="${itemId}">
        <label for="${itemId}">${name}</label>
      </div>
      <button type="button">
        <img src="assets/icons/trash.svg" alt="Ícone de lixeira" data-item-id="${itemId}">
      </button>
    `;
    
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.id = `container-${itemId}`;
    listItem.innerHTML = itemHTML.trim();
    shoppingList.append(listItem);
    const shoppingListButton = listItem.querySelector("button");
    shoppingListButton.addEventListener('click', handleRemoveShoppingItem);
  } catch (error) {
    footerText.innerText = error.message;
    footer.classList.remove("hide");
  }
}

function handleRemoveShoppingItem(event) {
  const itemId = event.target.getAttribute('data-item-id');
  const itemContainer = document.getElementById(`container-${itemId}`);
  
  list = list.filter(item => item.id !== itemId);

  itemContainer.remove();
  footerText.innerText = 'O item foi removido da lista';
  footer.classList.remove('hide');
}

function handleCloseFooter() {
  footer.classList.add('hide');
}
