import React from "react";

class App extends React.Component {
  state = {
    news: [
      {
        content: "Boris johnson wins election",
        createdBy: "John Smith",
      },
    ],
    editingNews: null,
  };

  handleSubmit = (singularNews) => {
    const { news } = this.state;
    console.log(singularNews);
    if (singularNews.index !== undefined) {
      news[singularNews.index] = {
        content: singularNews.content,
        createdBy: singularNews.createdBy,
      };
      this.setState({ news });
      this.setState({ editingNews: null });
    } else {
      delete singularNews.index;
      this.setState({ news: [...this.state.news, singularNews] });
    }
  };

  handleDelete = (index) => {
    const newArr = [...this.state.news];
    newArr.splice(index, 1);
    this.setState({ news: newArr });
  };

  handleEdit = (index) => {
    this.setState({ editingNews: { index, ...this.state.news[index] } });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="card frame">
          <Header numTodos={this.state.news.length} />
          <div className="container">
            <NewsList
              news={this.state.news}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
            />
            <SubmitForm
              onFormSubmit={this.handleSubmit}
              editingNews={this.state.editingNews}
            />
          </div>
        </div>
      </div>
    );
  }
}

class SubmitForm extends React.Component {
  state = {
      index: undefined,
      content: "",
      createdBy: ""
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.editingNews && nextProps.editingNews.index !== this.state.index) ||
       nextState.content !== this.state.content || nextState.createdBy !== this.state.createdBy
    );
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.editingNews && this.props.editingNews.index !== this.state.index
    ) {
      this.setState(this.props.editingNews);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.content === "" || this.state.createdBy === "") return;
    this.props.onFormSubmit({
      index: this.state.index,
      content: this.state.content,
      createdBy: this.state.createdBy,
    });
    this.setState({ index: undefined, content: "", createdBy: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          className="input"
          placeholder="Content"
          value={this.state.content}
          onChange={(e) => {
            this.setState({ content: e.target.value });
          }}
          rows="50"
        />
        <input
          type="text"
          className="input"
          placeholder="Created by"
          value={this.state.createdBy}
          onChange={(e) => {
            this.setState({ createdBy: e.target.value });
          }}
        />
        <button className="button">Submit</button>
      </form>
    );
  }
}

const Header = (props) => {
  return (
    <div className="card-header">
      <h1 className="card-header-title header">News Site</h1>
    </div>
  );
};

const NewsList = (props) => {
  const news = props.news.map((singularNews, index) => {
    return (
      <News
        content={singularNews}
        key={index}
        id={index}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    );
  });
  return (
    <div className="list-wrapper">
      <h1 className="card-header-title header" style={{ borderBottomWidth: 1 }}>
        Your News
      </h1>
      {news}
    </div>
  );
};

const News = (props) => {
  return (
    <div className="list-item">
      <div className="row">{props.content.content}</div>
      <div className="row">By: {props.content.createdBy}</div>
      <button
        className="delete is-pulled-right"
        onClick={() => {
          props.onDelete(props.id);
        }}
      ></button>
      <button
        className="button is-pulled-right"
        onClick={() => {
          props.onEdit(props.id);
        }}
      > Edit </button>
    </div>
  );
};

export default App;
