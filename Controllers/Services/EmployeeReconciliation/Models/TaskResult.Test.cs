using NUnit.Framework;

namespace ExitSurveyAdmin.Services.Tests
***REMOVED***
    [TestFixture]
    public class TaskResult_Should
    ***REMOVED***
        private TaskResult<int> _taskResult;

        [SetUp]
        public void SetUp()
        ***REMOVED***
            _taskResult = new TaskResult<int>();
      ***REMOVED***

        [Test]
        public void TaskResult_Add3Succeeded_ReturnTotalRecordCount3()
        ***REMOVED***
            _taskResult.AddSucceeded(1);
            _taskResult.AddSucceeded(1);
            _taskResult.AddSucceeded(1);

            Assert.AreEqual(3, _taskResult.TotalRecordCount);
      ***REMOVED***

        [Test]
        public void TaskResult_Add3Exceptions_ReturnTotalRecordCount0()
        ***REMOVED***
            _taskResult.AddException(new System.Exception(""));
            _taskResult.AddException(new System.Exception(""));
            _taskResult.AddException(new System.Exception(""));

            Assert.AreEqual(0, _taskResult.TotalRecordCount);
      ***REMOVED***

        [Test]
        public void TaskResult_Add1OfEach_ReturnTotalRecordCount3()
        ***REMOVED***
            _taskResult.AddFailed(1);
            _taskResult.AddSucceeded(1);
            _taskResult.AddIgnored(1);

            Assert.AreEqual(3, _taskResult.TotalRecordCount);
      ***REMOVED***

        [Test]
        public void TaskResult_Add3Failed_ReturnTotalRecordCount3()
        ***REMOVED***
            _taskResult.AddFailed(1);
            _taskResult.AddFailed(1);
            _taskResult.AddFailed(1);

            Assert.AreEqual(3, _taskResult.TotalRecordCount);
      ***REMOVED***
  ***REMOVED***
***REMOVED***
