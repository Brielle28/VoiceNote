import { RecordingSectionTypes } from '../Utils/RecordingSection';
import { Link } from 'react-router-dom';
import "../Css/RecordingSection.css"
const RecordingSection = () => {
    return (
        <section className="w-full min-h-screen bg-[#04121C] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full mx-auto max-w-7xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F3B204] text-center mb-8 sm:mb-12">
                    Choose a Recorder Type
                </h1>
                <div className='flex items-center justify-center w-full '>
                    <div className="grid grid-cols-1 gap-4 w-[70%] sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:gap-8">
                        {RecordingSectionTypes.map((recorderType) => (
                            <Link
                                to={recorderType.link}
                                key={recorderType.id}
                                className="w-full"
                            >
                                <button
                                    className="w-full h-full min-h-[120px] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12
                                    font-semibold text-sm sm:text-base md:text-lg
                                    border border-[#F3B204] rounded-lg
                                    text-[#F3B204] 
                                    shadow-lg shadow-[#F3B204]/20
                                    hover:bg-[#F3B204] hover:text-[#04121C]
                                    transition-all duration-300
                                    flex items-center justify-center text-center animate"
                                    title={`Go to ${recorderType.name}`}
                                >
                                    {recorderType.name}
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecordingSection;