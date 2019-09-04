import React from 'react';
import {redirect} from '../../utils/redirect';
import Link from 'next/link';

import Layout from '../../components/layout';
import API from '../../helpers/api';

function ListingsList(props) {
  const listings = props.listings;
  const listItems = listings.map((l) => (
    <li className="listing-item" key={l.id}>
      <Link href={`/listings/` + l.id}>
        <a>{<img src={l.image} />}</a>
      </Link>
      <style jsx>{`
        .listing-item {
          height: 233px;

          border: 0;
          background: #f6f6f6;
        }

        .listing-item img {
          width: 100%;
        }
      `}</style>
    </li>
  ));
  return (
    <ul className="listings-list">
      {listItems}

      <style jsx>{`
        .listings-list {
          list-style: none;
          padding: 0;
          margin: 0;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 30px;
          grid-auto-rows: minmax(100px, auto);
        }
      `}</style>
    </ul>
  );
}

class Listings extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    API.setContext(context);

    return {
      listings: await API.makeRequest('get', '/api/listings'),
    };
  }

  render() {
    let profile = this.props ? this.props.profile : {};
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
      >
        <div className="listings">
          <hr className="bg-light" />

          <ListingsList listings={this.props.listings} />

          <style jsx>{`
            .listings {
              padding-bottom: 100px;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

export default Listings;
