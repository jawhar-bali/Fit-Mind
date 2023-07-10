// import React, { Component } from 'react';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// import { Card, Avatar, Input, Typography } from 'antd';
// import HeaderSignedInClient from '../shared/HeaderSignedInClient';
// import "./style.css"
// const { Search } = Input;
// const { Text } = Typography;
// const { Meta } = Card;

// const client = new W3CWebSocket('ws://127.0.0.1:8000');

// export default class WebSocketChat extends Component {

//   state ={
//     userName: '',
//     isLoggedIn: false,
//     messages: []
//   }

//   onButtonClicked = (value) => {
//     client.send(JSON.stringify({
//       type: "message",
//       msg: value,
//       user: this.state.userName
//     }));
//     this.setState({ searchVal: '' })
//   }

//   componentDidMount() {
//     client.onopen = () => {
//       console.log('WebSocket Client Connected');
//     };
//     client.onmessage = (message) => {
//       const dataFromServer = JSON.parse(message.data);
//       console.log('got reply! ', dataFromServer);
//       if (dataFromServer.type === "message") {
//         this.setState((state) =>
//           ({
//             messages: [...state.messages,
//             {
//               msg: dataFromServer.msg,
//               user: dataFromServer.user
//             }]
//           })
//         );
//       }
//     };
//     const messages = JSON.parse(localStorage.getItem('chatMessages'));
//     if (messages) {
//       this.setState({ messages });
//     }
//     const userName = localStorage.getItem('userName');
//     if (userName) {
//       this.setState({ isLoggedIn: true, userName });
//       client.send(JSON.stringify({
//         type: "join",
//         user: userName
//       }));
//     }
//   }

//   componentWillUnmount() {
//     localStorage.setItem('chatMessages', JSON.stringify(this.state.messages));
//   }

//   render() {
//     return (
//       <div className="main" id='wrapper'>
//         <HeaderSignedInClient/>
//          <div className="slider-area2">
//         <div className="slider-height2 d-flex align-items-center">
//           <div className="container">
//             <div className="row">
//               <div className="col-xl-12">
//                 <div className="hero-cap hero-cap2 pt-70">
//                   <h2>Chat Community</h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//         {this.state.isLoggedIn ?
//         <div>
//           <div className="title">
//             <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>User name : {this.state.userName}</Text>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">
//             {this.state.messages.map(message => 
//               <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
//                 <Meta
//                   avatar={
//                     <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
//                   }
//                   title={message.user+":"}
//                   description={message.msg}
//                 />
//               </Card> 
//             )}
//           </div>
//           <div className="bottom">
//             <Search
//               placeholder="send a message ..."
//               enterButton=">"
//               value={this.state.searchVal}
//               size="large"
//               onChange={(e) => this.setState({ searchVal: e.target.value })}
//               onSearch={value => this.onButtonClicked(value)}
//             />
//           </div>
//         </div>
//         :
//         <div style={{ padding: '200px 40px' }}>
//           <Search
//             placeholder="Enter Username"
//             enterButton="JOIN CHAT COMMUNITY"
//             size="large"
//             onSearch={value => {
//               // check if the user has already joined
//               if (!this.state.isLoggedIn) {
//                 // set the state of userName and isLoggedIn
//                 this.setState({ isLoggedIn: true, userName: value }, () => {
//                   // send a message to the server with the username and type 'join'
//                   client.send(JSON.stringify({
//                     type: "join",
//                     user: this.state.userName
//                   }));
//                 });
//               } else {
//                 console.log("User has already joined.");
//               }
//             }}
//           />
//         </div>
//         }
//       </div>
//     );
//   }
// }



















// import React, { Component } from 'react';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// import { Card, Avatar, Input, Typography } from 'antd';
// import HeaderSignedInClient from '../shared/HeaderSignedInClient';
// import "./style.css"
// const { Search } = Input;
// const { Text } = Typography;
// const { Meta } = Card;

// const client = new W3CWebSocket('ws://127.0.0.1:8000');

// export default class WebSocketChat extends Component {

//   state ={
//     userName: '',
//     isLoggedIn: false,
//     messages: []
//   }

//   onButtonClicked = (value) => {
//     client.send(JSON.stringify({
//       type: "message",
//       msg: value,
//       user: this.state.userName
//     }));
//     this.setState({ searchVal: '' })
//   }

//   componentDidMount() {
//     client.onopen = () => {
//       console.log('WebSocket Client Connected');
//     };
//     client.onmessage = (message) => {
//       const dataFromServer = JSON.parse(message.data);
//       console.log('got reply! ', dataFromServer);
//       if (dataFromServer.type === "message") {
//         this.setState((state) =>
//           ({
//             messages: [...state.messages,
//             {
//               msg: dataFromServer.msg,
//               user: dataFromServer.user
//             }]
//           })
//         );
//       }
//     };
//     const messages = JSON.parse(localStorage.getItem('chatMessages'));
//     if (messages) {
//       this.setState({ messages });
//     }
//   }

//   componentWillUnmount() {
//     localStorage.setItem('chatMessages', JSON.stringify(this.state.messages));
//   }

//   render() {
//     return (
//       <div className="main" id='wrapper'>
//         <HeaderSignedInClient/>
//          <div className="slider-area2">
//         <div className="slider-height2 d-flex align-items-center">
//           <div className="container">
//             <div className="row">
//               <div className="col-xl-12">
//                 <div className="hero-cap hero-cap2 pt-70">
//                   <h2>Chat Community</h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//         {this.state.isLoggedIn ?
//         <div>
//           <div className="title">
//             <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>User name : {this.state.userName}</Text>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">
//             {this.state.messages.map(message => 
//               <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
//                 <Meta
//                   avatar={
//                     <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
//                   }
//                   title={message.user+":"}
//                   description={message.msg}
//                 />
//               </Card> 
//             )}
//           </div>
//           <div className="bottom">
//             <Search
//               placeholder="send a message ..."
//               enterButton=">"
//               value={this.state.searchVal}
//               size="large"
             
//               onChange={(e) => this.setState({ searchVal: e.target.value })}
//               onSearch={value => this.onButtonClicked(value)}
//               />
//               </div>
//               </div>
//               :
//               <div style={{ padding: '200px 40px' }}>
//               <Search
//               placeholder="Enter Username"
//               enterButton="JOIN CHAT COMMUNITY"
//               size="large"
//               onSearch={value => {
//               // set the state of userName and isLoggedIn
//               this.setState({ isLoggedIn: true, userName: value }, () => {
//               // send a message to the server with the username and type 'join'
//               client.send(JSON.stringify({
//               type: "join",
//               user: this.state.userName
//               }));
//               });
//               }}
       
              
//               />
//               </div>
//               }
//               </div>
//               )
//               }
//               }
              
              
              
              
              







// import React, { Component } from 'react';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// import { Card, Avatar, Input, Typography } from 'antd';
// import HeaderSignedInClient from '../shared/HeaderSignedInClient';

// const { Search } = Input;
// const { Text } = Typography;
// const { Meta } = Card;

// const client = new W3CWebSocket('ws://127.0.0.1:8000');

// export default class WebSocketChat extends Component {

//   state ={
//     userName: '',
//     isLoggedIn: false,
//     messages: []
//   }

//   onButtonClicked = (value) => {
//     client.send(JSON.stringify({
//       type: "message",
//       msg: value,
//       user: this.state.userName
//     }));
//     this.setState({ searchVal: '' })
//   }

//   componentDidMount() {
//     client.onopen = () => {
//       console.log('WebSocket Client Connected');
//     };
//     client.onmessage = (message) => {
//       const dataFromServer = JSON.parse(message.data);
//       console.log('got reply! ', dataFromServer);
//       if (dataFromServer.type === "message") {
//         this.setState((state) =>
//           ({
//             messages: [...state.messages,
//             {
//               msg: dataFromServer.msg,
//               user: dataFromServer.user
//             }]
//           })
//         );
//       }
//     };
//   }

//   render() {
//     return (
//       <div className="main" id='wrapper'>
//         <HeaderSignedInClient/>
//          <div className="slider-area2">
//         <div className="slider-height2 d-flex align-items-center">
//           <div className="container">
//             <div className="row">
//               <div className="col-xl-12">
//                 <div className="hero-cap hero-cap2 pt-70">
//                   <h2>Chat Community</h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//         {this.state.isLoggedIn ?
//         <div>
//           <div className="title">
//             <Text id="main-heading" type="secondary" style={{ fontSize: '36px' }}>Fitmind Chat Community: {this.state.userName}</Text>
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }} id="messages">
//             {this.state.messages.map(message => 
//               <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
//                 <Meta
//                   avatar={
//                     <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
//                   }
//                   title={message.user+":"}
//                   description={message.msg}
//                 />
//               </Card> 
//             )}
//           </div>
//           <div className="bottom">
//             <Search
//               placeholder="send a message ..."
//               enterButton="Send"
//               value={this.state.searchVal}
//               size="large"
//               onChange={(e) => this.setState({ searchVal: e.target.value })}
//               onSearch={value => this.onButtonClicked(value)}
//             />
//                         </div> 
//           </div>
//         :
//         <div style={{ padding: '200px 40px' }}>
//           <Search
//             placeholder="Enter Username"
//             enterButton="JOIN CHAT COMMUNITY"
//             size="large"
//             onSearch={value => this.setState({ isLoggedIn: true, userName: value })}
//           />
//         </div>
//       }
//       </div>
//     )
//   }
// }
