import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import Loader from "react-loader-spinner";
import "../App.css";
import "./users.css";

class UserList extends React.Component {
  constructor(props) {
    document.title = "Users Page";
    super(props);
    this.state = {
      users: [],
      userListLoading: true,
      userInfoLoading: false,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const { userInfo } = this.state;
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          var updatedList = _.unionBy(result, this.state.users, "id");
          if (userInfo && Object.keys(userInfo).length == 0) {
            this.getUserInfo(updatedList[0].id);
          }
          this.setState({
            userListLoading: false,
            users: updatedList,
          });
        },
        () => {
          this.setState({
            userListLoading: false,
          });
        }
      );
  };

  getUserInfo = (id) => {
    this.setState({ userInfoLoading: true }, () => {
      fetch(`https://api.github.com/users/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              userInfoLoading: false,
              userInfo: result,
            });
          },
          () => {
            this.setState({
              userInfoLoading: false,
            });
          }
        );
    });
  };

  componentDidUpdate() {
    const { userInfo, userInfoLoading } = this.state;
    if (
      !userInfoLoading &&
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      userInfo &&
      Object.keys(userInfo).length &&
      this.props.match.params.id !== userInfo.login
    ) {
      this.getUserInfo(this.props.match.params.id);
    }
  }

  getUserRows = ({ lable, value }) => {
    return (
      <div className="fieldValueContainer">
        <div className="col-md-6 field">{lable}:</div>
        <div className="col-md-6 value">{value}</div>
      </div>
    );
  };

  render() {
    const { users, userInfo, userInfoLoading } = this.state;

    return (
      <div className="mainContainer">
        <div className="col-md-2 leftPane">
          <div className="userListHeading">Users List</div>
          <div className="userListing">
            {users && users.length
              ? users.map((user) => (
                  <Link
                    key={user.id}
                    className={
                      user.id == userInfo.login
                        ? "userListItem selectedUserItem"
                        : "userListItem"
                    }
                    to={"/users/" + user.id}
                  >
                    {user.login}
                  </Link>
                ))
              : null}
          </div>
          <div onClick={() => this.getUser()} className="loadMore">
            Load More...
          </div>
        </div>
        <div className="col-md-10 rightPane">
          {userInfo && Object.keys(userInfo).length ? (
            <>
              <div className="labelContainer">
                <div className="col-md-5 userInfoLine"></div>
                <div className="col-md-2 userInfoText">User Info</div>
                <div className="col-md-5 userInfoLine"></div>
              </div>
              <div className="avatar-logo">
                <img
                  src={userInfo.avatar_url}
                  className="avatar"
                  alt="User Avatar"
                />
              </div>
              {this.getUserRows({
                lable: "UserId",
                value: userInfo.id,
              })}
              {this.getUserRows({
                lable: "Name",
                value: userInfo.name,
              })}
              {this.getUserRows({
                lable: "Email",
                value: userInfo.email,
              })}
              {this.getUserRows({
                lable: "Created At",
                value: moment(userInfo.created_at).format("DD MMM YYYY"),
              })}
            </>
          ) : null}
          {userInfoLoading && (
            <div className="loader">
              <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserList;
