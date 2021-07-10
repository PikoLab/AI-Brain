import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from "react-particles-js";


const particleOptions={
  "particles": {
      "number": {
          "value": 100
      },
      "size": {
          "value": 5
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}


const initialState ={
  input:'',
  imgUrl:'',
  box:{},
  route: 'signin',
  isSingedIn: false,
  user: {
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined: ''
}
  

}
 
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name: data.name,
      email:data.email,
      entries: 0,
      joined: data.joined
    }})

  }

  faceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width-(clarifaiFace.right_col * width),
      bottomRow: height-(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox=(box)=>{
    console.log(box);
    this.setState({box:box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit=()=>{
    this.setState({imgUrl:this.state.input});
      fetch('http://localhost:3000/imageurl',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response=>response.json())
      .then(response=>{
        if (response){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({id: this.state.user.id})
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.faceLocation(response));
      })
    .catch(err=>console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'||route === 'signin') {
      this.setState(initialState);
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }




  render(){
    const {imgUrl, box, route, isSignedIn} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}/>     
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        
        {route==='home'
          ? <div>
            <Logo />
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imgUrl={imgUrl}/>
          </div>
          :( route==='signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
            
        }

      </div>
    );

  }
  
}

export default App;
