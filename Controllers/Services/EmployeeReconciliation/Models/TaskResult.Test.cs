using NUnit.Framework;

namespace ExitSurveyAdmin.Services.Tests
{
    [TestFixture]
    public class TaskResult_Should
    {
        private TaskResult<int> _taskResult;

        [SetUp]
        public void SetUp()
        {
            _taskResult = new TaskResult<int>();
        }

        [Test]
        public void TaskResult_Add3Succeeded_ReturnTotalRecordCount3()
        {
            _taskResult.AddSucceeded(1);
            _taskResult.AddSucceeded(1);
            _taskResult.AddSucceeded(1);

            Assert.AreEqual(3, _taskResult.TotalRecordCount);
        }

        [Test]
        public void TaskResult_Add3Exceptions_ReturnTotalRecordCount0()
        {
            _taskResult.AddException(new System.Exception(""));
            _taskResult.AddException(new System.Exception(""));
            _taskResult.AddException(new System.Exception(""));

            Assert.AreEqual(0, _taskResult.TotalRecordCount);
        }

        [Test]
        public void TaskResult_Add1OfEach_ReturnTotalRecordCount3()
        {
            _taskResult.AddFailed(1);
            _taskResult.AddSucceeded(1);
            _taskResult.AddIgnored(1);

            Assert.AreEqual(3, _taskResult.TotalRecordCount);
        }

        [Test]
        public void TaskResult_Add3Failed_ReturnTotalRecordCount3()
        {
            _taskResult.AddFailed(1);
            _taskResult.AddFailed(1);
            _taskResult.AddFailed(1);

            Assert.AreEqual(3, _taskResult.TotalRecordCount);
        }
    }
}
