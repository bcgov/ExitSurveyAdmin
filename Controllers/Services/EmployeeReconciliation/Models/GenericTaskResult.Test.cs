using NUnit.Framework;

namespace ExitSurveyAdmin.Services.Tests
{
    [TestFixture]
    public class GenericTaskResult_Should
    {
        private GenericTaskResult<string> _genericTaskResult;
        private TaskResult<string> _taskResult;

        [SetUp]
        public void SetUp()
        {
            _genericTaskResult = new GenericTaskResult<string>(Models.TaskEnum.ReconcileEmployees);
            _taskResult = new TaskResult<string>();
        }

        [Test]
        public void GenericTaskResult_AddEmptyTaskResult_ReturnTotalRecordCount0()
        {
            _genericTaskResult.AddTaskResult(_taskResult);

            Assert.AreEqual(0, _genericTaskResult.CandidateCount);
        }

        [Test]
        public void GenericTaskResult_AddMixedTaskResult_ReturnCorrectRecordCounts()
        {
            _taskResult.AddFailed("");
            _taskResult.AddFailed("");
            _taskResult.AddIgnored("");
            _taskResult.AddSucceeded("");
            _genericTaskResult.AddTaskResult(_taskResult);

            Assert.AreEqual(4, _genericTaskResult.CandidateCount);
            Assert.AreEqual(1, _genericTaskResult.IgnoredCount);
            Assert.AreEqual(1, _genericTaskResult.SucceededCount);
        }

        [Test]
        public void GenericTaskResult_AddMixedTaskResultTwice_ReturnCorrectRecordCounts()
        {
            _taskResult.AddFailed("");
            _taskResult.AddFailed("");
            _taskResult.AddIgnored("");
            _taskResult.AddSucceeded("");
            _genericTaskResult.AddTaskResult(_taskResult);
            _genericTaskResult.AddTaskResult(_taskResult);

            Assert.AreEqual(8, _genericTaskResult.CandidateCount);
            Assert.AreEqual(2, _genericTaskResult.IgnoredCount);
            Assert.AreEqual(2, _genericTaskResult.SucceededCount);
        }

        [Test]
        public void GenericTaskResult_AddIncremental_ReturnCorrectRecordCounts()
        {
            _taskResult.AddFailed("");
            _taskResult.AddFailed("");
            _taskResult.AddIgnored("");
            _taskResult.AddIgnored("");
            _taskResult.AddIgnored("");
            _taskResult.AddSucceeded("");

            var incrementalAddResult = _genericTaskResult.AddIncrementalStep(_taskResult);

            Assert.AreEqual(5, _genericTaskResult.CandidateCount);
            Assert.AreEqual(3, _genericTaskResult.IgnoredCount);
            Assert.AreEqual(1, incrementalAddResult.Count);
        }

        [Test]
        public void GenericTaskResult_AddFinal_ReturnCorrectRecordCounts()
        {
            _taskResult.AddFailed("");
            _taskResult.AddFailed("");
            _taskResult.AddIgnored("");
            _taskResult.AddIgnored("");
            _taskResult.AddIgnored("");
            _taskResult.AddSucceeded("");

            _genericTaskResult.AddFinalStep(_taskResult);

            Assert.AreEqual(6, _genericTaskResult.CandidateCount);
            Assert.AreEqual(3, _genericTaskResult.IgnoredCount);
            Assert.AreEqual(1, _genericTaskResult.SucceededCount);
        }

        [Test]
        public void GenericTaskResult_AddIncrementalThenFinal_ReturnCorrectRecordCounts()
        {
            _taskResult.AddFailed(""); // Added in incremental
            _taskResult.AddIgnored(""); // Added in incremental
            _taskResult.AddException(new System.Exception("")); // Added in incremental
            _taskResult.AddSucceeded(""); // NOT added in incremental

            var incrementalAddResult = _genericTaskResult.AddIncrementalStep(_taskResult);

            var newResult = new TaskResult<string>();
            newResult.AddFailed(""); // Added in final
            newResult.AddIgnored(""); // Added in final
            newResult.AddSucceeded(""); // Added in final
            newResult.AddException(new System.Exception("")); // Added in final

            _genericTaskResult.AddFinalStep(newResult);

            Assert.AreEqual(5, _genericTaskResult.CandidateCount);
            Assert.AreEqual(2, _genericTaskResult.IgnoredCount);
            Assert.AreEqual(1, _genericTaskResult.SucceededCount);
            Assert.AreEqual(2, _genericTaskResult.ExceptionCount);
        }
    }
}
