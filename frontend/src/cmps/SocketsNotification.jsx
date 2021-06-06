import { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'
import { socketService } from '../services/socketService'



export class SocketsNotification extends Component {
  state = {

  }

  componentDidMount() {
    socketService.on('adopt-request-owner', (msg) => {
      console.log('messging the owner')
      this.adoptNotify(msg)
    });
    socketService.on('adopt-request-requester', (msg) => {
      console.log('messging the requester')
      this.adoptNotify(msg)
    });
    socketService.on('already-requested', (msg) => {
      this.alertNotify(msg)
    });
  }

  componentWillUnmount() {
    console.log('SocketsNotification - unmount')
    socketService.off('adopt-request-owner')
    socketService.off('adopt-request-requester')
    socketService.off('already-requested')
  }

  adoptNotify = (msg) => {
    store.addNotification({
      title: "Wonderful!",
      message: msg,
      type: "info",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false
      }
    });
  }
  alertNotify = (msg) => {
    store.addNotification({
      title: "",
      message: '',
      type: "info",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false
      }
    });
  }
  render() {

    return (
      // <Link to='/profile' >
      // <Link>
      <>
        <ReactNotification />
      </>
      // </Link>

    )
  }
}
