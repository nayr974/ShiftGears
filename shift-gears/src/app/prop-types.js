import PropTypes from "prop-types";

// This file extends the packages default prop types with custom shapes for this application, to reduce
// boilerplate code.
//
// PropTypes shapes are a loose form of type safety. When running the application in development mode,
// they raise error messages to the console if any props passed to a component do not match the expected
// shape as defined.

PropTypes.Task = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
});

PropTypes.Lane = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.Task),
});

PropTypes.TaskBoard = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lanes: PropTypes.arrayOf(PropTypes.Lane),
});

export default PropTypes;
