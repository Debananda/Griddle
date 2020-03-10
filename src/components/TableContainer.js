import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from '../utils/griddleConnect';

import {
  classNamesForComponentSelector,
  stylesForComponentSelector,
  dataLoadingSelector,
  visibleRowCountSelector
} from '../selectors/dataSelectors';
import GriddleContext from '../context/GriddleContext';

const ComposedContainerComponent = (OriginalComponent) =>
  connect((state, props) => ({
    dataLoading: dataLoadingSelector(state),
    visibleRows: visibleRowCountSelector(state),
    className: classNamesForComponentSelector(state, 'Table'),
    style: stylesForComponentSelector(state, 'Table')
  }))((props) => {
    const griddleContext = useContext(GriddleContext);
    const tableContainerProps = {
      ...props,
      TableHeading: griddleContext.components.TableHeading,
      TableBody: griddleContext.components.TableBody,
      Loading: griddleContext.components.Loading,
      NoResults: griddleContext.components.NoResults
    };
    return <OriginalComponent {...tableContainerProps} />;
  });

export default ComposedContainerComponent;
