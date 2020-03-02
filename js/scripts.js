var Contract = React.createClass({
  render: function() {
    return (
      <div className="contract">
        <dl className="meta dl-horizontal">
          <dt>Status</dt>
          <dd>{this.props.status}</dd>

          <dt>With</dt>
          <dd>{this.props.with}</dd>

          <dt>Title</dt>
          <dd>{this.props.title}</dd>

          <dt>Date</dt>
          <dd>{this.props.date}</dd>

          <dt>Date Modified</dt>
          <dd>{this.props.dateModified}</dd>
                    
        </dl>
        <div className="body" dangerouslySetInnerHTML={{__html: this.props.body}}></div>
      </div>
    );
  }
});

var ContractListItem = React.createClass({
  render: function() {
    return (
      <tr onClick={this.props.on_click.bind(null)}>
        <td className={'STATUS ' + this.props.status}>{this.props.status}</td>
        <td>{this.props.with}</td>
        <td>{this.props.title}</td>
        <td>{this.props.date}</td>
        <td>{this.props.dateModified}</td>        
      </tr>
    );
  }
});

var ContractList = React.createClass({
  render: function() {
    var contract_list = this.props.contracts.map(function(contract) {
      return (
        <ContractListItem key={contract.id}
                       with={contract.with}
                       title={contract.title}
                       status={contract.status}
                       date={contract.date} 
                       dateModified={contract.dateModified}                                              
                       on_click={this.props.onSelectContract.bind(null, contract.id)} />
      );
    }.bind(this));

    return (
      <table className="contract-list table table-striped table-condensed">
        <thead>
          <tr>
            <th>Status</th>
            <th>With</th>
            <th>Title</th>
            <th>Date</th> 
            <th>Date Modified</th>                        
          </tr>
        </thead>
        <tbody>
          {contract_list}
        </tbody>
      </table>
    );
  }
});

var NoneSelected = React.createClass({
  render: function() {
    return (
      <div className="none-selected alert alert-warning" role="alert">
        <span>No {this.props.text} selected.</span>
      </div>
    );
  }
});

var Contractbox = React.createClass({
  getInitialState: function(){
    return { contract_id: null };
  },

  handleSelectContract: function(id) {
    this.setState({ contract_id: id });
  },

  render: function() {
    var contract_id = this.state.contract_id;
    if (contract_id) {
      var contract = this.props.contracts.filter(function(contract) {
        return contract.id == contract_id;
      })[0];
      selected_contract = <Contract id={contract.id}
                              with={contract.with}
                              title={contract.title}
                              status={contract.status}
                              date={contract.date}
                              dateModified={contract.dateModified}                              
                              body={contract.body} />;
    } else {
      selected_contract = <NoneSelected text="contract" />;
    }

    return (
      <div>
        <ContractList contracts={this.props.contracts}
                   onSelectContract={this.handleSelectContract} />
        <div className="contract-viewer">
          {selected_contract}
        </div>
      </div>
    );
  }
});

var ContractboxList = React.createClass({
  render: function() {
    var contractbox_list = this.props.contractboxes.map(function(contractbox) {
      return (
        <li className="list-group-item"
            key={contractbox.id}
            onClick={this.props.onSelectContractbox.bind(null, contractbox.id)}>
          <span className="badge">
            {contractbox.contracts.length}
          </span>
          {contractbox.name}
        </li>
      );
    }.bind(this));

    return (
      <div className="col-md-2">
        <ul className="contractboxes list-group">
          {contractbox_list}
        </ul>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function(){
    return { contractbox_id: null };
  },

  handleSelectContractbox: function(id) {
    this.setState({ contractbox_id: id });
  },

  render: function() {
    var contractbox_id = this.state.contractbox_id;
    if (contractbox_id) {
      var contractbox = this.props.contractboxes.filter(function(contractbox) {
        return contractbox.id == contractbox_id;
      })[0];
      selected_contractbox = <Contractbox key={contractbox.id}
                                  contracts={contractbox.contracts} />;
    } else {
      selected_contractbox = <NoneSelected text="contractbox" />;
    }

    return (
      <div className="app row">
        <ContractboxList contractboxes={this.props.contractboxes}
                     onSelectContractbox={this.handleSelectContractbox} />
        <div className="contractbox col-md-10">
          <div className="panel panel-default">
            <div className="panel-body">
              {selected_contractbox}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var fixtures = [
  {
    id: 1,
    name: "INBOX",
    contracts: [
      {
        id: 1,
        with: "Oleg Vinokurov",
        title: "Jiu Jitsu contact",
        status: "PENDING",
        body: "Contract with Oleg Vinokurov and Independent Jiu Jitsu School <br> <embed src=\"pdf/contract.pdf#page=1\" type=\"application/pdf\" width=\"750\" height=\"500\">",
        date: "02/11/2020",
        dateModified : "02/16/2020",
        notes:[
                {
                  id:1,
                  author:"Oleg Vinokurov",
                  date:"01/01/2020 1:20pm",
                  note:"negotiation note 1"
                },
                {
                  id:2,
                  author:"Sam Smith",
                  date:"01/02/2020 1:30pm",
                  note:"negotiation note 2"
                },
                {
                  id:3,
                  author:"Oleg Vinokurov",
                  date:"01/01/2020 3:35pm",
                  note:"negotiation note 3"
                }
              ],
      },
      {
        id: 2,
        with: "Ben Willis",
        title: "Music Contract",
        status: "NEGOTIATION",
        body: "Music contract. <br><img src='img/contract.jpg'>",
        date: "02/10/2020",
        dateModified : "02/22/2020"
      },
      {
        id: 3,
        with: "Alex Smith",
        title: "Football Contract",
        status: "INEFFECT",
        body: "<h1>Alexander Douglas</h1> <p>The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. </p> <br><img src='https://www.kcseminoles.com/img/CMC%20%202017%20Player%20Contract_Page_1.png' width='600'>",
        date: "02/01/2020",
        dateModified : "02/20/2020"
      },
      {
        id: 4,
        with: "Elizabeth Barry ",
        title: "Appartment Contract",
        status: "INEFFECT",
        body: "One bedroom appartment contract <br> <img src='img/contract.jpg' width=300/)>",
        date: "01/01/2020",
        dateModified : "02/02/2020"
      },
      {
        id: 5,
        with: "Alex Ruthor",
        title: "Medical contract",
        status: "PENDING",
        body: "<img src='img/contract.jpg'>",
        date: "02/03/2001",
        dateModified : "02/02/2010"
      },
      {
        id: 6,
        with: "Nigerian Prince",
        title: "Contract with Nigerian Prince",
        status: "CANCELED",
        body: "This contract is Old<br> <img src='img/np.jpg'>",
        date: "01/01/2001",
        dateModified : "02/02/2001"
      }
    ]
  },
  {
    id: 7,
    name: "PENDING",
    contracts: [
      {
        id: 3,
        with: "	Oleg Vinokurov",
        title: "Jiu Jitsu contact",
        status: "PENDING",
        body: "Contract with Oleg Vinokurov and Independent Jiu Jitsu School <br> <embed src=\"pdf/contract.pdf#page=1\" type=\"application/pdf\" width=\"750\" height=\"500\">",
        date: "02/11/2020",
        dateModified : "02/16/2020",
      },
      {
        id: 4,
        with: "Alex Ruthor",
        title: "Medical contract",
        status: "PENDING",
        body: "<img src='img/contract.jpg'>",
        date: "02/03/2001",
        dateModified : "02/02/2010"
      }
    ]
  }
  ,
  {
    id: 4,
    name: "INEFFECT",
    contracts: [
      {
        id: 3,
        with: "Alex Smith",
        title: "Football Contract",
        status: "INEFFECT",
        body: "<h1 class=\"btn btn-info btn-lg\">Alexander Douglas</h1> <p>The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. </p> <br><img src='https://www.kcseminoles.com/img/CMC%20%202017%20Player%20Contract_Page_1.png' width='300'> ",
        date: "02/01/2020",
        dateModified : "02/20/2020"
      },
      {
        id: 4,
        with: "Elizabeth Barry ",
        title: "Appartment Contract",
        status: "INEFFECT",
        body: " <img src='img/contract.jpg' width=300/)>",
        date: "01/01/2020",
        dateModified : "02/02/2020"
      }
    ]
  }
  ,
  {
    id: 9,
    name: "NEGOTIATION",
    contracts: [
      {
        id: 2,
        with: "Ben Willis",
        title: "Music Contract",
        status: "NEGOTIATION",
        body: "<img src='img/contract.jpg' width=600/)>",
        date: "02/10/2020",
        dateModified : "02/22/2020"
      }
    ]
  },
  {
    id: 6,
    name: "CANCELED",
    contracts: [
      {
        id: 3,
        with: "Nigerian Prince",
        title: "Contract with Nigerian Prince",
        status: "CANCELED",
        body: "This contract is Old<br> <img src='img/np.jpg'>",
        date: "01/01/2001",
        dateModified : "02/02/2001"
      }
    ]
  }

];

React.render(
  <App contractboxes={fixtures} />,
  document.body
);
