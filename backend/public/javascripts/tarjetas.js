function cargarTarjetas() {
    tarjetas.forEach(producto => {
      const article = document.createElement('article')
      article.classList.add('producto')
      article.innerHTML = `<article class="tarjetas">
          <div class="imagen_producto"><img src="${producto.imagen}" alt="${producto.titulo}" id="${producto.imgID}"/></div>
          <span class="nombre_producto"><a href="/products/productDetail">${producto.titulo}</a></span>
          <p class="descripcion_producto">
            ${producto.descripcion}
          </p>
          <div class="div_precio"><span class="precio_texto">precio: </span><span class="precio_producto" id="${producto.precio}">${producto.precio}</span></div>
          <div>
            <button class="boton_añadir" type="submit">
              Añadir al carrito
            </button>
          </div>
        </article>`;
        contenedorProductos.append(article)
    });
}
cargarTarjetas()