import React from 'react';
import "./headerfooter.css";

function Header() {
  
  return (
    <header>
      <div className='topcontainer'>
        <div className="topLeft">
          <span className='topText'>GradeBook Project</span>
        </div>
        <div className="topRight">
          <nav>
            <ul id='href'>
              <li><a href="https://sakai.ug.edu.gh/portal/help/TOCDisplay/content.hlp?docId=whatisgradebook">Home</a></li>
              <li><a href="https://mygrowthmindset.home.blog/2021/01/24/what-story-does-your-grade-book-tell/">About</a></li>
              <li><a href="https://www.linkedin.com/in/kishorkunal1999/">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
      
      <nav id='href1'>
        <ul>
          <li><a href="https://www.lpu.in/">University: Lovely Professional University</a></li>
          <li><a href="https://www.linkedin.com/in/mirjunaidrasool/">Professor: MIR JUNAID RASOOL</a></li>
        </ul>
        
        <ul>
          <li>Department: CSE</li>
          <li>Group: K19FE</li>
        </ul>
        
        <ul>
          <li>Title: Front End</li>
          <li>Section: 8</li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <div className='footerContainer'>
      <div className="left">
        <span className='footerText'>© 2023 GradeBook </span>
      </div>
      <div className="right">
        <span className='footerTextRight'>Designed by : <a href='https://www.linkedin.com/in/kishorkunal1999/'>Kishor Kunal </a>(11904645)</span>
      </div>
    </div>
  )
}
export {Header, Footer};

