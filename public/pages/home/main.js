// Aqui serão criados os eventos de Manipulação de DOM e templates
export const home = () => {
  const container = document.createElement('div');

  container.innerHTML = ` 
    <form>
      <input id='name' type='text'>
      <button id='greeting-btn'>Dizer Oi</button>
    </form>
    <div id='greeting-message'></div>
  `;

  return container;
};
