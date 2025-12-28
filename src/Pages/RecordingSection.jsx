import { RecordingSectionTypes } from '../Utils/RecordingSection';
import { Link } from 'react-router-dom';
import "../Css/RecordingSection.css"
const RecordingSection = () => {
    return (
        <section className="w-full min-h-screen bg-[#04121C] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <div className="w-full mx-auto max-w-7xl">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#F3B204] text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4">
                    Choose a Recorder Type
                </h1>
                <div className='flex items-center justify-center w-full'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%]">
                        {RecordingSectionTypes.map((recorderType) => (
                            <Link
                                to={recorderType.link}
                                key={recorderType.id}
                                className="w-full"
                            >
                                <button
                                    className="w-full h-full min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] 
                                    px-4 py-6 sm:px-5 sm:py-8 md:px-6 md:py-10 lg:px-8 lg:py-12
                                    font-semibold text-sm sm:text-base md:text-lg lg:text-xl
                                    border border-[#F3B204] rounded-lg
                                    text-[#F3B204] 
                                    shadow-lg shadow-[#F3B204]/20
                                    hover:bg-[#F3B204] hover:text-[#04121C]
                                    transition-all duration-300
                                    flex items-center justify-center text-center animate
                                    active:scale-95"
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