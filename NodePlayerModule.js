//
//  NodePlayerModule.js
//
//  Created by Mingliang Chen on 2017/11/29.
//  Copyright © 2017年 NodeMedia. All rights reserved.
//

import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { requireNativeComponent, View, UIManager, findNodeHandle } from "react-native";

const RCT_VIDEO_REF = "NodePlayerView";

class NodePlayerView extends Component {
    constructor(props) {
        super(props);

        this.RCTNodePlayer = UIManager.getViewManagerConfig("RCTNodePlayer");
    }

    _onChange(event) {
        if (!this.props.onStatus) {
            return;
        }

        this.props.onStatus(event.nativeEvent.code, event.nativeEvent.message);
    }

    pause() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            this.RCTNodePlayer.Commands.pause,
            null
        );
    }

    start() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            RCTNodePlayer.Commands.start,
            null
        );
    }

    stop() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            RCTNodePlayer.Commands.stop,
            null
        );
    }

    render() {
        return (
            <RCTNodePlayer
                {...this.props}
                ref={RCT_VIDEO_REF}
                onChange={this._onChange.bind(this)}
            />
        );
    }
}
NodePlayerView.name = RCT_VIDEO_REF;
NodePlayerView.propTypes = {
    inputUrl: PropTypes.string,
    bufferTime: PropTypes.number,
    maxBufferTime: PropTypes.number,
    autoplay: PropTypes.bool,
    scaleMode: PropTypes.oneOf(["ScaleToFill", "ScaleAspectFit", "ScaleAspectFill"]),
    renderType: PropTypes.oneOf(["SURFACEVIEW", "TEXTUREVIEW"]),
    onStatus: PropTypes.func,
    ...View.propTypes
};

const RCTNodePlayer = requireNativeComponent("RCTNodePlayer", NodePlayerView, {
    nativeOnly: { onChange: true }
});

module.exports = NodePlayerView;
