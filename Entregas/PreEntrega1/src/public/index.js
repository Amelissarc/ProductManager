const socket = io();

const table = document.getElementById('table');

const createChild = (product) => {
  const html = `
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td>${product.stock} unidades</td>
              `

  // Actualizar el HTML de la página
  const newElement = document.createElement('tr');
  newElement.id = product.id;
  newElement.innerHTML = html;
  table.appendChild(newElement);
}

const deleteChild = (productId) => {
  const child = document.getElementById(productId);

  if (!child) {
    table.removeChild(child);
  }
}

const updateProducts = (products) => {
  table.innerHTML = "";

  products.forEach((product) => createChild(product));
}

socket.on('connect', () => {
  console.log('Conectado al servidor de socket.io');
});

socket.on("newProduct", (product) => {
  createChild(product);
});

socket.on("deleteProduct", (productId) => {
  deleteChild(productId);
});

socket.on('initProduct', (products) => {
  updateProducts(products);
});

socket.on("updateProduct", (product) => {
  deleteChild(product.id);
  createChild(product);
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor de socket.io');
});