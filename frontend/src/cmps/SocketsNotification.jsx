import { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'
import { socketService } from '../services/socketService'



export class SocketsNotification extends Component {
  state = {
  }

  async componentDidMount() {
    socketService.on('adopt-requested', (data) => {
      console.log(data)
      this.adoptNotify(data.msg)
    });
    socketService.on('adopt-request-owner', (msg) => {
      console.log(msg)
      this.adoptNotify(msg)
    });
    socketService.on('adopt-request-requester', (msg) => {
      console.log(msg)
      this.adoptNotify(msg)
    });
  }

  componentWillUnmount() {
    console.log('unmount')
    socketService.off('adopt-requested')
  }

  adoptNotify = (msg) => {
    store.addNotification({
      title: "Wonderful!",
      message: msg,
      type: "info",
      insert: "top-right",
      container: "bottom-full",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }
  render() {

    return (
      <Link to='/profile' >
        <ReactNotification />
      </Link>

    )
  }
}
