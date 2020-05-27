const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function checkValidJsonStr(str) {
  return  isJson(str) && Array.isArray(JSON.parse(str)) && JSON.parse(str).every(it => it.hasOwnProperty('name') && it.hasOwnProperty('birthday'))
}
const weekDays = [0, 1, 2, 3, 4, 5, 6];
const submitFunc = function(e){
  e.preventDefault();
  let json = document.getElementById('json').value;
  let calYear = document.getElementById('calyear').value;
  if (!checkValidJsonStr(json)) {
    alert('Invalid JSON');
    return false
  }
  else {
    const userArr = JSON.parse(json);
    let birthdaysDup = {};
    userArr.forEach(user => {
      let userBday = new Date(user.birthday);
      userBday.setFullYear(calYear);
      let day = userBday.getDay();
      if (birthdaysDup.hasOwnProperty(day)) birthdaysDup[day].push(user.name);
      else birthdaysDup[day] = [user.name];
    });

    for (let weekDay = 0; weekDay < 7; weekDay++){
      const names = birthdaysDup[weekDay]
      const squareSide = names ? Math.ceil(Math.sqrt(names.length)): 1;
      let element = document.getElementById(`bday_${weekDay.toString()}`).firstElementChild.children[1];
      element.parentElement.replaceChild(document.createElement('div'), element);
      element = document.getElementById(`bday_${weekDay.toString()}`).firstElementChild.children[1];
      element.classList.add('grid_container');
      element.style.gridTemplateColumns = `repeat(${squareSide}, auto)`;
      element.style.gridTemplateRows = `repeat(${squareSide}, auto)`;

      for (let i = 0; i < (names ? names.length : 0); i++){
        const nodeToAdd = document.createElement('div');
        nodeToAdd.classList.add('grid_child');
        nodeToAdd.style.background = colorArray[i.toString()];
        nodeToAdd.innerText = names[i].split(" ").length >= 2 ? `${names[i].split(" ")[0][0].toUpperCase()}${names[i].split(" ")[1][0].toUpperCase()}` : `${names[i][0].toUpperCase()}`
        element.appendChild(nodeToAdd);
      }
    }
    console.log(birthdaysDup);
    return false
  }
};

document.getElementById('form-birthday').onsubmit = submitFunc;
document.getElementById('submit').onclick = submitFunc;
