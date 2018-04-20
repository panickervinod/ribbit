import * as React from "react";
import { Component } from "react";

import ImagesPanel from "./images-panel";

import { FeedInfo } from "../lib/feed";
import { formatDate } from "../lib/utility";
import { getTransactionCreationTimestamp } from "../lib/transaction";

interface Props {
  feedInfo: FeedInfo;
}
interface State {}

export default class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.feedInfo) {
      return null;
    }
    const summary = this.props.feedInfo.summary;
    const transactionInfo = this.props.feedInfo.transactionInfo;
    const userPanel = (
      <div className="user-panel">
        <div
          className="profile-image"
          style={{
            backgroundImage: `url("https://avatars3.githubusercontent.com/u/1908863?s=460&v=4")`
          }}
        />
        <div className="name">Yiyi Wang</div>
        <div className="userid">shd101wyy</div>
        <div className="postfix">c862b4eel</div>
        <div className="action">post feed</div>
        <div className="create-time">
          <span>
            {formatDate(getTransactionCreationTimestamp(transactionInfo))}
          </span>
        </div>
      </div>
    );

    if (summary.title) {
      // Article
      return (
        <div className="card">
          {userPanel}
          <div className="content-panel">
            {summary.images.length ? (
              <div
                className="cover"
                style={{
                  backgroundImage: `url("${summary.images[0]}")`
                }}
              />
            ) : null}
            <div className="title">{summary.title}</div>
            <div
              className="summary"
              dangerouslySetInnerHTML={{ __html: summary.summary }}
            />
          </div>
          <div className="button-group" />
        </div>
      );
    } else {
      // Normal
      return (
        <div className="card">
          {userPanel}
          <div className="content-panel">
            <div
              className="summary"
              dangerouslySetInnerHTML={{ __html: summary.summary }}
            />
            <ImagesPanel images={summary.images} />
          </div>
        </div>
      );
    }
  }
}