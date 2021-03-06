import React, {Component} from 'react';
import AdminSideBar from './AdminSideBar';
import './styles/Admin.css';
import DecorativeBorder from './DecorativeBorder';
import {Link} from 'react-router-dom';

//Admin Sub Pages Components
import SiteMap from './SiteMap';
import Pages from './Pages';
import EditPages from './EditPages';
import AddSite from './AddSite';
import AddLink from './AddLink';
import AddDocument from './AddDocument';
import AddContainer from './AddContainer';
import EditPage from './EditPage';
import Events from './Events';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';
import EditEvents from './EditEvents';

class Admin extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentRoute: props.page,
      mainPageWidth: 0,
      mainPageHeight: 0,
      offsetHeight: 0,
      offsetMainPage: 0
    }
  }

  componentDidMount(){
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize);
  }

  componentWillUpdate(nextProps){
    if(this.props.page){
      if(this.props.page.page !== nextProps.page.page){
        const currentRoute = {...this.state.currentRoute};
        currentRoute.page = nextProps.page.page;
        this.setState({currentRoute});
      }

    }
  }

  onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const sideBarWidth = document.querySelector('.admin-sidebar').getBoundingClientRect().width;
    const headerHeight = document.querySelector('.admin-header').getBoundingClientRect().height;
    const offsetHeight = headerHeight;
    const mainPageHeight = height-headerHeight;
    const offsetMainPage = sideBarWidth;
    const mainPageWidth = width-sideBarWidth;
    this.setState({mainPageWidth, offsetMainPage, offsetHeight, mainPageHeight});
  }

  render(){
    return(
      <div className="admin-container">
        <header className="admin-header">
          <Link to="/admin/"><h1>KAHUKU ADMIN PANEL</h1></Link>
          <DecorativeBorder/>
        </header>
        <div className="admin-main">
          <AdminSideBar onResize={this.onResize} route={this.props.route}/>
          <div
            style={{
              width:`${this.state.mainPageWidth}px`,
              marginLeft:`${this.state.offsetMainPage}px`,
              minHeight:`${this.state.mainPageHeight}px`
            }}
            className="admin-page">
            {this.state.currentRoute && this.state.currentRoute.page === 'sitemap' ?
            <SiteMap mainPageWidth={this.state.mainPageWidth}/> : null}

            {this.state.currentRoute && this.state.currentRoute.page === 'events' ?
            <Events mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.props.route === '/admin/events/add' ?
            <AddEvent mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.props.route === '/admin/events/edit' ?
            <EditEvents mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.props.route === `/admin/events/edit/${this.props.page.page}` ?
            <EditEvent pageId={this.props.page.page} mainPageWidth={this.state.mainPageWidth}/> : null}


            {this.state.currentRoute && this.state.currentRoute.page === 'pages' ?
            <Pages mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.state.currentRoute && this.state.currentRoute.page === 'add-site' ?
            <AddSite mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.state.currentRoute && this.state.currentRoute.page === 'add-container' ?
            <AddContainer mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.state.currentRoute && this.state.currentRoute.page === 'add-link' ?
            <AddLink mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.state.currentRoute && this.state.currentRoute.page === 'add-document' ?
            <AddDocument mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.props.route === '/admin/pages/edit' ?
            <EditPages mainPageWidth={this.state.mainPageWidth}/> : null}
            {this.props.page && this.props.route === `/admin/pages/edit/${this.props.page.page}` ?
            <EditPage pageId={this.props.page.page} mainPageWidth={this.state.mainPageWidth}/> : null}
          </div>
        </div>
      </div>
    );
  }
};

export default Admin;
