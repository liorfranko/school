import React from 'react';
import ReactDOM from 'react-dom';
var ContentEditable = React.createClass({
    render: function(){
        console.log(this.props);
        return <div id="contenteditable"
                    onInput={this.emitChange}
                    onBlur={this.emitChange}
                    contentEditable
                    dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    },

    shouldComponentUpdate: function(nextProps){
        return nextProps.html !== this.ReactDOM().innerHTML;
    },

    componentDidUpdate: function() {
        if ( this.props.html !== this.ReactDOM().innerHTML ) {
            this.ReactDOM().innerHTML = this.props.html;
        }
    },

    emitChange: function(){
        var html = this.ReactDOM().innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
});