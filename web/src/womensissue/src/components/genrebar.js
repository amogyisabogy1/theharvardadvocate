import React from "react"
import { Link } from 'gatsby'
import allLink from '../images/allLink.png'
import artLink from '../images/artLink.png'
import fictionLink from '../images/fictionLink.png'
import interviewsLink from '../images/conversationsLink.png'
import essayLink from '../images/essayLink.png'
import poetryLink from '../images/poetryLink.png'



export default ({ children }) => (
  <ul class="genreBar">
    <li class="genre"><Link to="/" activeClassName="active"><img class="genrelink" src={allLink}></img></Link></li>
    <li class="genre"><Link to="/art" activeClassName="active"><img class="genrelink" src={artLink}></img></Link></li>
    <li class="genre"><Link to="/fiction" activeClassName="active"><img class="genrelink" src={fictionLink}></img></Link></li>
    <li class="genre"><Link to="/personalessay" activeClassName="active"><img class="genrelink" src={essayLink}></img></Link></li>
    <li class="genre"><Link to="/poetry" activeClassName="active"><img class="genrelink" src={poetryLink}></img></Link></li>
    <li class="genre"><Link to="/interview" activeClassName="active"><img class="genrelink" src={interviewsLink}></img></Link></li>
  </ul>
)
