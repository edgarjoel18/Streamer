import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  state = { isSignedIn: null };
  // init google's library
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "658047039952-tj7fqvt7j0astk9anss20cd6h1fsliu7.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get()); // update our state in the redux store
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  } // end of func
  // the user's login status changes
  onAuthChange = (isSignedIn) => {
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign out With Google
        </button>
      );
    }
    return (
      <button className="ui green google button" onClick={this.onSignInClick}>
        <i className="google icon" />
        Sign in With Google
      </button>
    );
  }
  onSignInClick = () => {
    this.auth.signIn(this.auth.currentUser.get().getId());
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

// from the store get back the state with the isSignedIn
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
