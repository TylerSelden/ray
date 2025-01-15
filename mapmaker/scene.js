Global.Scene.textureMap = {
  ' ': {
    color: "rgba(0, 0, 0, 0)",
    solid: false
  },
  '.': {
    color: "rgba(255, 255, 255, 1)",
    solid: true
  },
  '#': {
    color: "rgba(0, 0, 255, 1)",
    solid: true
  },
  '+': {
    color: "rgba(0, 255, 0, 1)",
    solid: true
  },
  '&': {
    color: "rgba(255, 255, 0, 1)",
    solid: true
  },
  '%': {
    color: "rgba(255, 0, 0, 1)",
    solid: true
  }
}

function borderColor(str) {
  const [r, g, b] = str.match(/\d+/g).slice(0, 3).map(Number);
  const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  return luminance > 0.5 ? "#000" : "#fff";

}

function makeTexBtns() {
  let template = document.getElementById("template");
  for (let i in Global.Scene.textureMap) {
    let color = Global.Scene.textureMap[i].color;
    let e = template.cloneNode();

    e.id = i;
    e.innerText = i;
    e.className = "btn btn-color mb-3";
    e.style.backgroundColor = color;
    e.style.borderColor = borderColor(color);
    e.style.color = borderColor(color);

    e.onclick = () => { Global.select(i) };

    document.getElementById("rightToolbar").appendChild(e);
  }
  Global.select();
}

Global.selected = ' ';

function blockAt(mx, my) {
  if (!Global.Scene.data[my]) return undefined;
  return Global.Scene.data[my][mx];
}

Global.place = (dir) => {
  let block = blockAt(Global.mx, Global.my) || Array(4).fill(' ');
  if (block.split) block = block.split('');

  block[dir] = Global.selected;

  if (!Global.Scene.data[Global.my]) Global.Scene.data[Global.my] = [];
  Global.Scene.data[Global.my][Global.mx] = block.join('');
}

Global.select = (btn) => {
  Global.selected = btn || ' ';

  Array.from(document.querySelectorAll(".selected")).forEach((e) => e.classList.remove("selected"));
  document.getElementById(Global.selected).classList.add("selected");
}

export { makeTexBtns }
