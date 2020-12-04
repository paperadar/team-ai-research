import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FolderInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modify: false,
      folder: this.getFolderProperty(props.chooseFolder),
    };
  }

  getFolderProperty(folderID) {
    return window.api.database.getFolderProperty(window.db, folderID);
  }

  operation(act) {
    switch (act) {
      case "edit":
        this.setState({
          modify: true,
        });
        break;
      case "cancel":
        this.setState({
          modify: false,
          folder: this.getFolderProperty(this.props.chooseFolder),
        });
        break;
      case "save":
        try {
          if (this.state.folder.name === "") {
            alert("Please input the name!");
          } else {
            window.api.database.saveFolder(window.db, {
              ID: this.props.chooseFolder,
              name: this.state.folder.name,
              description: this.state.folder.description,
              fatherID: this.state.folder.fatherID,
            });
            alert("Successfully edit the information of bookmark!");
            this.props.setChooseFolder(this.props.chooseFolder);
            this.setState({
              modify: !this.state.modify,
            });
          }
        } catch (error) {
          console.error(error);
          alert("Fail to edit!");
        }
        break;
      case "delete":
        if (window.confirm("Are you surely want to delete this bookmark?")) {
          window.api.database.deleteFolder(window.db, this.props.chooseFolder);
          alert("Successfully delete the bookmark!");
          this.props.clearInfoZone();
        }
        break;
      default:
        console.error("Hit default case");
        return;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // TODO: https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
    this.setState({
      folder: this.getFolderProperty(nextProps.chooseFolder),
      modify: false,
    });
  }

  handleChanges(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    let copy = { ...this.state.folder };
    copy[[name]] = value;

    this.setState({
      folder: copy,
    });
  }

  render() {
    return (
      <div className="InfoZone">
        <h2>Folder Information</h2>
        <div className="FolderName">
          <label htmlFor="FolderName">Name</label>
          <input
            id="FolderName"
            type="text"
            value={this.state.folder.name}
            name="name"
            onChange={this.handleChanges.bind(this)}
            disabled={!this.state.modify}
          />
        </div>
        <div className="FolderDescription">
          <label htmlFor="FolderDescription">Description</label>
          <input
            id="FolderDescription"
            type="text"
            name="description"
            value={this.state.folder.description}
            onChange={this.handleChanges.bind(this)}
            disabled={!this.state.modify}
          />
        </div>
        <div className="FolderCreateTime">
          Create time: {this.state.folder.createtime}
        </div>
        <div className="Operations">
          {this.props.openFolderCallback ? (
            <input
              type="button"
              value="Open"
              onClick={() =>
                this.props.openFolderCallback(
                  this.props.chooseFolder,
                  window.api.database.getFolderPath(
                    window.db,
                    this.props.chooseFolder
                  )
                )
              }
            />
          ) : null}
          {!this.state.modify ? (
            <span className="InformationEditFalse">
              <input
                type="button"
                value="Edit"
                onClick={() => this.operation("edit")}
              />
              {this.props.openFolderCallback ? null : (
                <input
                  type="button"
                  value="Delete"
                  onClick={() => this.operation("delete")}
                />
              )}
            </span>
          ) : (
            <span className="InformationEditTrue">
              <input
                type="button"
                value="Save"
                onClick={() => this.operation("save")}
              />
              <input
                type="button"
                value="Cancel"
                onClick={() => this.operation("cancel")}
              />
            </span>
          )}
        </div>
      </div>
    );
  }
}

FolderInformation.propTypes = {
  chooseFolder: PropTypes.number.isRequired,
  setChooseFolder: PropTypes.func.isRequired,
  clearInfoZone: PropTypes.func.isRequired,
};
