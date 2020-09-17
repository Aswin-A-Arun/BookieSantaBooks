import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { SwipeListView } from 'react-native-swipe-list-view';

import db from '../config';
import { DrawerItems } from 'react-navigation-drawer';


export default class SwipeableFlatlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      allNotifications : this.props.allNotifications,
    };
  }


  updateMarkAsRead =(notification)=>{
      db.collection("all_notifications").doc(notification.doc_id).update({
          "notification_status" : "read"
  })
  }

  onSwipeValueChange = swipeData => {
      var allNotifications = this.state.allNotifications
      const {key,value}  = swipedata;

      if(value < -Dimensions.get('window').width){
          const newData = [...allNotifications];
          const prevIndex = allNotifications.findIndex(item => DrawerItems.key === key);
          this.updateMarkAsRead(allNotifivcations[prevIndex]);
          newData.splice(prevIndex, 1);
          this.setState({allNotifications : newData})
      };
  };

  renderItem = data => (
      <Animated.View>
          <ListItem
          leftElement = {<Icon name = "book" type="font-awesome" color ='#696969'/>}
          title={data.item.book_name}
          titleStyle={{color: 'black', fontWeight: 'bold' }}
          subtitle={data.item.message}
          bottomDivider
          />
        </Animated.View>
  );


  renderHidenItem = () => (
      <View style={StyleSheet.rowBack}>
          <View style={[styles.backrightBtn, style.backrightBtnRight]}>
              <text style={styles.backTextWhite}></text>
          </View>
      </View>
  );

  render(){
      return(
          <View style={styles.container}>
              <SwipeListView
              disableRightSwipe
              data={this.state.allNotifications}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay-={3000}
              onSwipeValueChange={this.onSwipeValueChange}
              />
          </View>
      )
  }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex:1,
    },
    backTextWhite: {
        color: '#FFF',
        fontweight:'bold',
        fontSize: 15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6fb',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space=bateween',
        paddingLeft: 15
    },
    backrRightBtn: {
        alignitems :'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100
    },
    backrightBtnRight: {
        backgroundColor: '#29b6fb',
        right: 0
    }


});