import { useState } from 'react'

import './App.css'

const descriptions = [
  {title: "Section 1", content: "Quick Background"},
  {title: "Section 2", content: "Time Periods"},
  {title: "Section 3", content: "Main Characters and Arcs"},
];

function MyButton(){
  const [num, setNum] = useState(0)
  function handleClick(){
    alert('What is your favorite saga in the Star Wars Universe? Is it the clone wars saga, or is it the time period with the First Order?')
    setNum(num + 1)
  }

  return (
  <div className = "firstblock">
    <button onClick = {handleClick}>
      <h1>The <em>Clone Wars</em> lore</h1>
             <p>The Clone Wars was a time period in the star wars universe where the clones were still on the </p>
              <p>side of the Jedi and the dark side consisted of droids and multiple sith lords. At this time</p>
              <p>Anakin Skywalker was still on the light side and he had not become Darth Vader yet. No one knew</p>
              <p>that Chancellor Palpatine was actually behind the whole war.</p>
              <p>Oh, and by the way, you've tried to make up your mind {num} times!</p>
    </button>
  </div>
  );
}

function Box(){
  return (
    <div className = "secondblock">
      <button>
        <h1>Who Were the Main Chracters?</h1>
              <p>On the light side, it was mainly Obi Wan Kenobi, Ahsoka Tano, and Anakin Skywalker doing the fighting.
                Yoda helped occasionally. On the light side, it was Asaaj Ventress, Darth Maul, Count Dooku, and General Grevious.
                According to the popular TV show, the light side always won.
              </p>
      </button>
    </div>
    );
}

function Button2({title, content}){
  return(
    <div className = "first">
      <h1>{title}</h1>
        <p>
          {content}
        </p>
    </div>
  )
}
function App() {

  const [dark, setDark] = useState(false)

  function handleClick() {
    setDark(!dark)
  
  }

  return(
    <div>
     <NavBar />
     <MyButton />
     <Button2 />
     <div>
      {descriptions.map((element) => (
        <Button2 title = {element.title} content = {element.content} />
      ))}
      </div>
      <Box />
    </div>

  )
}
function NavBar() {
  return (
    <nav>
      <div>
        <h1 className="logo">The Star Wars Universe</h1>
      </div>
      <ul className="nav-links">
        <li>
          Home
        </li>
        <li>
          About
        </li>
        <li>
          Sources
        </li>
        <li>
          Explore
        </li>
      </ul>
    </nav>
  );
}



export default App