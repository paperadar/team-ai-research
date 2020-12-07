/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import AnnotatorComment from './Comment';
import AnnotatorQA from './QA';
import AnnotatorTranslate from './Translate';
import AnnotatorSearch from './Search';

class AnnotatorSidebar extends React.Component {
  render() {
    const displaySidebar = this.props.RENDER_OPTIONS.pdfDocument;
    return (
      <div id="sidebar-wrapper" style={{ display: displaySidebar ? null : 'none' }}
        className="no-annotation">
        {/* Class "no-annotation" is a special class in modified pdf-annotate.js.
            When clicked on them, pdf-annotate.js won't blur/click annotations on pdf documents. */}
        <div className="sidebar-tab">
          <button onClick={() => this.props.SwitchTab(0)}>Comments</button>
          <button onClick={() => this.props.SwitchTab(1)}>Q &amp; A</button>
          <button onClick={() => this.props.SwitchTab(2)}>Translate</button>
          <button onClick={() => this.props.SwitchTab(3)}>Search</button>
        </div>
        <div style={{ display: this.props.TAB === 0 ? null : 'none' }}>
          <AnnotatorComment UI={this.props.UI} PDFJSAnnotate={this.props.PDFJSAnnotate}></AnnotatorComment>
        </div>
        <div style={{ display: this.props.TAB === 1 ? null : 'none' }}>
          <AnnotatorQA UI={this.props.UI} QA={this.props.QA} updateQA={this.props.updateQA}></AnnotatorQA>
        </div>
        <div style={{ display: this.props.TAB === 2 ? null : 'none' }}>
          <AnnotatorTranslate 
            UI={this.props.UI} 
            Text={this.props.Text}
            TranslationMode={this.props.TranslationMode}
            SwitchTranslationMode={this.props.SwitchTranslationMode}>
          </AnnotatorTranslate>
        </div>
        <div style={{ display: this.props.TAB === 3 ? null : 'none' }}>
          <AnnotatorSearch
            UI={this.props.UI} 
            Text={this.props.Text}
            SearchMode={this.props.SearchMode}
            SwitchSearchMode={this.props.SwitchSearchMode}>
          </AnnotatorSearch>
        </div>
      </div>
    );
  }
}

AnnotatorSidebar.propTypes = {
  UI: PropTypes.object,
  PDFJSAnnotate: PropTypes.object,
  RENDER_OPTIONS: PropTypes.object,
  QA: PropTypes.array,
  updateQA: PropTypes.func.isRequired
};

export default AnnotatorSidebar;
